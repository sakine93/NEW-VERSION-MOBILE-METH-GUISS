import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController, LoadingController, Platform, ToastController } from '@ionic/angular';
//import {Camera} from '@ionic-native/'
import {Camera,CameraOptions,PictureSourceType} from '@ionic-native/camera/ngx'
//import {File} from '@ionic-native/file/ngx';
import {WebView} from '@ionic-native/ionic-webview/ngx';
import { File,FileEntry } from '@ionic-native/file/ngx';
import { HttpClient } from '@angular/common/http';
import {finalize} from 'rxjs/operators'
import { Storage } from '@ionic/storage';
import { async } from '@angular/core/testing';

const STORAGE_KEY = 'my_images';
@Component({
  selector: 'app-updateitem',
  templateUrl: './updateitem.page.html',
  styleUrls: ['./updateitem.page.scss'],
})
export class UpdateitemPage implements OnInit {
images = [];
  name: string = '';
  img:string ='';
  poids: number ;
  pic_filename:any;
  id: number;
  category:string='';
  type_or:string='';
 
  messerreur:string ='';

  constructor(
    private postPvdr: PostProvider,
    private router: Router,
    public toastController: ToastController,
    private actRoute: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private plt:Platform,
    private storage:Storage,
    private file:File,
    private webview:WebView,
    private camera:Camera,
    private http:HttpClient,
    private loadingController:LoadingController,
    private actionSheetController:ActionSheetController
  ) { 

    this.loadStoredImages();
  }

  ngOnInit() {
    this.loadStoredImages();
    this.actRoute.params.subscribe((data: any) => {
      this.id = data.id;
      this.type_or = data.type_or;
      this.name = data.name;
      this.category = data.category;
      this.poids = data.poids;
    
      console.log(data);

      this.plt.ready().then(()=>{
        this.loadStoredImages();
      })
      });
  }

  loadStoredImages(){
    
this.storage.get(STORAGE_KEY).then(images=> {
  if(images){
    let arr = JSON.parse(images);
    this.images =[];
    for (let img of arr){
      let filePath = this.file.dataDirectory + img;
      let resPath = this.pathForImage(filePath);
      this.images.push({name:img,path:resPath,filePath:filePath});
    }
  }
})
  }


  pathForImage(img){
    if(img===null){
      return '';
    }else{
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

  chargerphoto(){
 
    this.router.navigate(['/updateitem/']);
    this.loadStoredImages();
  }

  async selectImage(){
    const actionSheet = await this.actionSheetController.create({
      header:"Choisir la source de limage",
      buttons:[{
        text:'Choisir dans la galerie',
        handler: () =>{
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text:'Appareil Photo',
        handler: () =>{
          this.takePicture(this.camera.PictureSourceType.CAMERA);
          this.router.navigate(['/updateitem/']);
          this.loadStoredImages();
          this.chargerphoto();
        }
      },
      {
        text:'Annuler',
        role :'Cancel'

      }
   
      
    
    ]
    });
    await actionSheet.present();
  }

  takePicture(sourceType:PictureSourceType){
    var options: CameraOptions ={
      quality:100,
      sourceType:sourceType,
      saveToPhotoAlbum:false,
      correctOrientation:true,
      cameraDirection: 1,
      allowEdit: true,
      targetHeight: 50,
      targetWidth: 50
    };
    this.camera.getPicture(options).then(imagePath => {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/')+1);
      var correctPath = imagePath.substr(0,imagePath.lastIndexOf('/')+1);
      this.copyFileToLocalDir(correctPath,currentName,this.createFileName());
    });
  }
  copyFileToLocalDir(namePath,currentName,newFileName) {
this.file.copyFile(namePath,currentName,this.file.dataDirectory ,newFileName).then(_ =>{
this.updateStoredImages(newFileName);  
}, error => {

  this.presentToast('Erreur lors de lenregistrement du fichier');
});

}


updateStoredImages(name){
  this.storage.get(STORAGE_KEY).then(images =>{
let arr = JSON.parse(images);
if(!arr){
  let newImages = [name];
  this.storage.set(STORAGE_KEY,JSON.stringify(newImages));
}else{
  arr.push(name);
  this.storage.set(STORAGE_KEY,JSON.stringify(arr));
}

let filePath = this.file.dataDirectory +name;
let resPath = this.pathForImage(filePath);

let newEntry ={
  name:name,
  path:resPath,
  filePath :filePath
};
//this.images= [newEntry, ...this.images];
this.ref.detectChanges();
  })
}

deleteImage(imgEntry,position){
  this.images.splice(position,1);
  this.storage.get(STORAGE_KEY).then(images=>{
    let arr = JSON.parse(images);
    let filtered = arr.filter(name => name != imgEntry.name);
    this.storage.set(STORAGE_KEY,JSON.stringify(filtered));

    var correctPath = imgEntry.filePath.substr(0,imgEntry.filePath.lastIndexOf('/')+1);
    this.file.removeFile(correctPath,imgEntry.name).then(res =>{
      this.presentToast('Fichier supprimé.');
    });
  })
}

startUpload(imgEntry){
  this.file.resolveLocalFilesystemUrl(imgEntry.filePath).then(entry =>{
    (<FileEntry>entry).file( file => this.readFile(file))
  })
  .catch(err =>{
    this.presentToast('Erreur de lecture du fichier');
  })
}

readFile(file: any){ 
  const reader = new FileReader();
  reader.onloadend = () =>{
    const formData = new FormData();
    const imgBlob = new Blob([reader.result],{
      type:file.type
    });
    formData.append('file',imgBlob ,file.name);
    this.uploadImageData(formData);
  };
  reader.readAsArrayBuffer(file);
}
async uploadImageData(formData : FormData){
  const loading = await this.loadingController.create({
//content :'Uploading image...',
  });

  await loading.present();

  this.http.post("http://mobile.bijouteriess.com/server_api/upload.php",formData).
  pipe(
    finalize(()=>{
      loading.dismiss();
    })
  )
  .subscribe(res =>{
    if(res['success']){
      this,this.presentToast('fichier telechargé completement')
    } else{
      this.presentToast('file telechargement echec');
    }
  })

}


async presentToast(text){
  

  const toast = await this.toastController.create({
    message:text,
    position:'bottom',
    duration: 2000
  })
  toast.present();
}


  createFileName(){
    var d = new Date(),
    n = d.getTime(),
    newFileName = n + ".jpg";
    return newFileName;
  }
  verifprix(){
  /* var nb1 = this.poids;
   var nb2 = this.item_unit_price;
   var nb3 = this.prix_vente_g;
   var calcul =nb2/nb1;
if(nb2<nb3){
 this.messerreur ='Le prix nest pas bon';
  
  //this.item_unit_price ='';
}else if(nb2>=nb3){
  this.messerreur ='';
}
*/
  }
  async updateProsesItems(name) {
    
    if (this.poids <= 0){
      const toast = await this.toastController.create({
        message: 'Veuillez mettre le poids du bijoux svp',
        duration: 2000
      });
      toast.present();
    } else {
      let body = {
        aksi: 'updateitems',
        item_id : this.id,
        poids : this.poids,
        pic_filename : name,
        
     
      };
      this.postPvdr.postData(body, 'file_aksi.php').subscribe( async data => {
        var alertpesan = data.msg;
        if (data.success) {
          this.router.navigate(['/barcodes']);
          
          const toast = await this.toastController.create({
            message: 'barcode mise a jour avec succes',
            duration: 500
          });
          toast.present();
         
        } else {
          const toast = await this.toastController.create({
            message: alertpesan,
            duration: 1000
          });
        }
      });


    }
  }

}
function newFileName(newFileName: any) {
  throw new Error('Function not implemented.');
}

