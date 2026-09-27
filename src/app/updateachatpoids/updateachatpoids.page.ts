import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { formatNumber } from '@angular/common';
import { CustomerPage } from '../customer/customer.page';
import { ActionSheetController, LoadingController, Platform } from '@ionic/angular';
import {Camera,CameraOptions,PictureSourceType} from '@ionic-native/camera/ngx'
import {WebView} from '@ionic-native/ionic-webview/ngx';
import { File,FileEntry } from '@ionic-native/file/ngx';
import { HttpClient } from '@angular/common/http';
import {finalize} from 'rxjs/operators'
import { FilePath } from '@ionic-native/file-path/ngx';

import { async } from '@angular/core/testing';
const STORAGE_KEY = 'my_images';
const STORAGE_KEY2='my_images';
const STORAGE_KEY3='my_images';

@Component({
  selector: 'app-updateachatpoids',
  templateUrl: './updateachatpoids.page.html',
  styleUrls: ['./updateachatpoids.page.scss'],
})
export class UpdateachatpoidsPage implements OnInit {
  images = [];
  imagess = [];
  imagesss = [];
  
  select1:any;
  img:string ='';
  imgtest:string='';
  imgtest2:string='';
  imgtest3:string='';
  imgg:string='';
  imggg:string='';
  

  pic_filename:any;
  pic_filename1:any;
  pic_filename2:any;

  category:string='';
  type_or:string='';

  achats: any = [];
  scannedData: any;
  encodedData: '';
  encodeData: any;
  inputData: any;
  supplier_name:string='';
  nbre:any;
  photo :string =''
  qrData = null;
  createdCode = null;
  scannedCode = null;
  comment: any = '';
  confprix18imp:any;
  customers: any = [];
  limit: number = 10;
  start: number = 0;
  num_sachet:string='';
  totalachats:any;
  totalpoids:any;
  heure : Date = new Date();
  //sale_status: string = '';
  item_id: string = '';
  quantity: number = 0;

  item_location: number ;
  description : string;
  isListItemOpened18k : boolean = false;
  isListItemOpenedall : boolean = false;
  
  sale_id: number;
  codeacces: any;

  anggota: any;
  name: string = '';
  name2: string = '';
  num_barcode :string ='';
  num_achat:any;
  amount:number=0;
  poids18imp:any=0;
  amount18imp:any=0;
  poids18local:any=0;
  amount18local:any=0;
  imgg2:string='';
  poids14local:any=0;
  amount14local:any=0;
  poids21imp:any=0;
  amount21imp:any=0;
  poids22imp:any=0;
  amount22imp:any=0;
  poidsargent:any=0;
  amountargent1:any=0;
  poidsargentor:any=0;
  amountargentorr:any=0;
  
  item_unit_price: number=0 ;
  systeme_vente:string='';
  id: number;
  prix_du_g:number;
  prix_vente_g:number;
  poids:number;
  poidsvendu:number;
  messerreur:string ='';
  confprix18loc: any;
  confprix18brute: any;
  confprix21k: any;
  confprixargent: any;
  confprix22k: any;
  confprixautre: any;

  constructor(
    private postPvdr: PostProvider,
    private router: Router,
    private storage: Storage,
    public toastController: ToastController,
    private actRoute: ActivatedRoute,
    public alertCtrl:AlertController,
    private ref: ChangeDetectorRef,
    private plt:Platform,
    private file:File,
    private webview:WebView,
    private camera:Camera,
    private http:HttpClient,
    private actionSheetController:ActionSheetController,
    private loadingController:LoadingController,
    private filePath: FilePath,
    
    
  ) {


   }

  ngOnInit() {
  
 

    this.ionViewWillEnter();
    this.actRoute.params.subscribe((data: any) => {
    
      let num =0;
      this.id = data.id;
     // this.amount18imp=data.amount18imp+num;
    
      //this.amountargentorr=data.amountargentorr;
     

      //this.item_unit_price = data.item_unit_price;
      this.name = data.name;
      this.num_achat=data.num_achat;
      this.num_barcode = data.num_achat;
      this.systeme_vente = data.systeme_vente;
      this.prix_du_g = data.prix_du_g;
      this.prix_vente_g = data.prix_vente_g;
      this.poids = data.poids;
      console.log(data);
      this.plt.ready().then(()=>{
       
      })
      });
  }



  
  async verifprix18k(){

    var nm1 = parseInt(this.amount18local);
   
  var nm2= parseInt(this.amount18imp);
  var nm3= parseInt(this.amount21imp);
  var nm4= parseInt(this.amount22imp);
  var nm5= parseInt(this.amountargent1);
  var nm6= parseInt(this.amountargentorr);
  var nm7= parseInt(this.amount14local);

  //pour les poids
  var np1 = parseFloat(this.poids18imp);
  var np2= parseFloat(this.poids18local);
  var np3= parseFloat(this.poids21imp);
  var np4= parseFloat(this.poids22imp);
  var np5= parseFloat(this.poidsargent);
  var np6= parseFloat(this.poidsargentor);
  var np7= parseFloat(this.poids14local);


  //pour les poids
  var calcultotal : number = +nm1 + +nm2 + +nm3 + +nm4 + +nm5 + +nm6 + +nm7 ;
  var calcultotalpoids : number = +np1 + +np2 + +np3 + +np4 + +np5 + +np6 + +np7;
  var photo2 = this.imgg2;
    await this.alertCtrl.create({
      
      header:'Details Achats ',
      message:'Total Achats '+calcultotal +'<br>'+ ' Total Poids :'+calcultotalpoids,
     inputs:[
      {
        type:'text',name:'supplier_name',placeholder:'Nom et Prenom du client', 
        
        }
        

        
     ],
      
      
      buttons:[
      {text:'Envoyer',handler:(res)=>{
      this.supplier_name=res.supplier_name;
      this.pic_filename=this.imgtest;
      this.pic_filename1=this.imgtest2;
      this.pic_filename2=this.imgtest3;
        //gerer 18k imp
    var nb118k = this.poids18imp;
    var nb218k = this.amount18imp;
    var nb318k= this.confprix18imp
    var calcul18k =nb218k/nb118k;
   //gere 18k imp
   //gerer 18k loc
   var nb118kloc = this.poids18local;
   var nb218kloc = this.amount18local;
   var nb318kloc= this.confprix18loc
   var calcul18kloc =nb218kloc/nb118kloc;
  //gere 18k loc
 
   //gerer 21k 
   var nb121k = this.poids21imp;
   var nb221k = this.amount21imp;
   var nb321k= this.confprix21k
   var calcul21k =nb221k/nb121k;
  //gere 21k 
 
   //gerer 22k 
   var nb122k = this.poids22imp;
   var nb222k = this.amount22imp;
   var nb322k= this.confprix22k
   var calcul22k =nb222k/nb122k;
  //gere 21k 
    //gerer Argent 
    var nb1argent = this.poidsargent;
    var nb2argent = this.amountargent1;
    var nb3argent= this.confprixargent
    var calculargent =nb2argent/nb1argent;
   //gere Argent 
 
 
    //gere autre 
 
    var nb1autre = this.poidsargentor;
    var nb2autre = this.amountargentorr;
    var nb3autre= this.confprixautre
    var calculautre =nb2autre/nb1autre;
   //gere autre 
//brute
var nb1brute = this.poids14local;
var nb2brute = this.amount14local;
var nb3brute= this.confprix18brute;
var calculbrute =nb2brute/nb1brute;
//fin brute

 
 if(calcul18k>nb318k){
 alert('Revoyer le prix sur le titre 18k importe');
   
   //this.item_unit_price ='';
 }else if(calcul18kloc>nb318kloc){
   alert('Revoyer le prix sur le titre 18k local');
 }else if(calcul21k>nb321k){
   alert('Revoyer le prix sur le titre 21k');
 }else if(calcul22k>nb322k){
   alert('Revoyer le prix sur le titre 22k');
 }else if(calculargent>nb3argent){
   alert('Revoyer le prix sur le titre argent');
 }else if(calculautre>nb3autre){
   alert('Revoyer le prix sur le titre autre');
 }else if(calculbrute>nb3brute){
  alert('Revoyer le prix sur le titre brute');
}else{
   calcultotal=calcultotal;
  this.pic_filename =this.imgtest;
  this.pic_filename1=this.imgtest2;
  this.pic_filename2=this.imgtest3;
   this.updateProses(calcultotal,this.supplier_name,this.imgtest,this.imgtest2,this.imgtest3);
 }
        
      
      }
      
      },{
      text:"Annuler",handler:(res)=>{
       
      
      }
      }
      ]
          }).then(res =>res.present());
    
   

  }
  doRefresh(event) {
    setTimeout(() => {
      this.loadAchats2();
      event.target.complete();
    }, 500);
  }

  chargerphoto2V(){
    alert('Photo Verso non activé');
  }

  chargerphoto2(){
    alert('Photo Recto non activé');
  }

  ionViewWillEnter() {
    this.achats = [];
    this.start = 0;
    this.loadAchats2();
    this.storage.get('session_storage').then((res) => {
      this.anggota = res;
      this.codeacces = this.anggota.codeacces;
  

    });
    
 
  }

  loadAchats2() {
    return new Promise(resolve => {
      let body = {
        aksi: 'getachatsprix',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
      };

      let body2 = {
        aksi: 'gettotalachats',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
      };

      this.postPvdr.postData(body, 'file_aksi.php').subscribe(data => {
        for (let achat of data.result) {
         this.nbre =0;
         
        
         
        this.confprix18imp=achat.confprix18imp;
        this.confprix18loc=achat.confprix18loc;
        this.confprix18brute=achat.confprix18brute;
        this.confprixargent=achat.confprixargent;
        this.confprix21k=achat.confprix21k;
        this.confprix22k=achat.confprix22k;
        this.confprixargent=achat.confprixargent;
        this.confprixautre=achat.confprixautre;
   
        
         
        }
        resolve(true);
      });

      this.postPvdr.postData(body2, 'file_aksi.php').subscribe(data => {
        for (let achat of data.result) {
         this.nbre =0;
          this.totalachats =this.amount18imp;
          this.totalpoids =achat.totalpoids;
        
         
        }
        resolve(true);
      });
    });
  }


  dismissModala(){
    this.router.navigate(['menubijouterie']);
  }

  async updateProses(calcultotal,supplier_name,imgtest,imgtest2,imgtest3) {
  
      let body = {
      
        aksi: 'updateachatbess',
        calcultotal:calcultotal,
        supplier_name:supplier_name,
        pic_filename : imgtest,
        pic_filename1:imgtest2,
        pic_filename2:imgtest3,
       // num_sale : this.name,
       date:this.heure,
       codeacces : this.codeacces,
        num_barcode:this.num_achat,
        num_achat:this.num_achat,
        poids18imp:this.poids18imp,
        amount18imp:this.amount18imp,
        poids18local:this.poids18local,
        amount18local:this.amount18local,
        poids14local:this.poids14local,
        amount14local:this.amount14local,
        poids21imp:this.poids21imp,
        amount21imp:this.amount21imp,
        poids22imp:this.poids22imp,
        amount22imp:this.amount22imp,
        poidsargent:this.poidsargent,
        amountargent1:this.amountargent1,
        poidsargentor:this.poidsargentor,
        amountargentorr:this.amountargentorr
     
      };
      this.postPvdr.postData(body, 'file_aksi.php').subscribe( async data => {
        var alertpesan = data.msg;
        if (data.success) {
          
          this.router.navigate(['/customer']);
          
          const toast = await this.toastController.create({
            message: 'Achat bien effectué avec success',
            duration: 2000
          });
          toast.present();
        } else {
          const toast = await this.toastController.create({
            message: 'Ce numero de sachet est deja utilisé',
            duration: 2000
          });
        }
      });


    
  }

  loadStoredImages() {
    this.storage.get(STORAGE_KEY).then(images => {
      if (images) {
        let arr = JSON.parse(images);
        this.images = [];
        for (let img of arr) {
          let filePath = this.file.dataDirectory + img;
          let resPath = this.pathForImage(filePath);
          this.images.push({ name: img, path: resPath, filePath: filePath });
      
        }
    
      }
    });
  }

      loadStoredImages2(){
    
        this.storage.get(STORAGE_KEY2).then(imagess=> {
          if(imagess){
            let arr = JSON.parse(imagess);
            this.imagess =[];
            for (let imgg of arr){
              let filePath = this.file.dataDirectory + imgg;
              let resPath = this.pathForImage2(filePath);
              this.imagess.push({name:imgg,path2:resPath,filePath:filePath});
                 this.ionViewWillEnter();
            }
          }
        })
          }
    
    
          pathForImage(img) {
            if (img === null) {
              return '';
            } else {
              let converted = this.webview.convertFileSrc(img);
              return converted;
            }
          }
      pathForImage2(imgg){
        if(imgg===null){
          return '';
        }else{
          let converted = this.webview.convertFileSrc(imgg);
          return converted;
        }
      }
      pathForImage3(imggg){
        if(imggg===null){
          return '';
        }else{
          let converted = this.webview.convertFileSrc(imggg);
          return converted;
        }
      }
    
     
      async selectImage() {
        const actionSheet = await this.actionSheetController.create({
            header: "Veuillez choisir la photo de l'achat",
            buttons: [
                {
                    text: 'Prendre une Photo de l\'achat',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                      
                    }
                },
                {
                    text: 'Annuler ',
                    role: 'cancel'
                }
            ]
        });
        await actionSheet.present();
    }

      //select image 2
      async selectImage2() {
        const actionSheet = await this.actionSheetController.create({
            header: "Select Image recto",
            buttons: [
                {
                    text: 'Prendre Photo de la piece',
                    handler: () => {
                        this.takePicture2(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        await actionSheet.present();
    }

    async selectImage3() {
      const actionSheet = await this.actionSheetController.create({
          header: "Select Image Verso",
          buttons: [
              {
                  text: 'Prendre Photo de verso la piece',
                  handler: () => {
                      this.takePicture3(this.camera.PictureSourceType.CAMERA);
                  }
              },
              {
                  text: 'Cancel',
                  role: 'cancel'
              }
          ]
      });
      await actionSheet.present();
  }
      //fin select image
    
      takePicture(sourceType: PictureSourceType) {
        var options: CameraOptions = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            allowEdit:false
        };
    
        this.camera.getPicture(options).then(imagePath => {
          
                this.filePath.resolveNativePath(imagePath)
                    .then(filePath => {
                       let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1);
                    this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                 
                    });
             
        });
    
    }

    
    takePicture2(sourceType: PictureSourceType) {
      var options2: CameraOptions = {
          quality: 100,
          sourceType: sourceType,
          saveToPhotoAlbum: false,
          correctOrientation: true,
          allowEdit:false
      };
  
      this.camera.getPicture(options2).then(imagePath2 => {
       
              this.filePath.resolveNativePath(imagePath2)
                  .then(filePath => {
                      let correctPath2 = filePath.substr(0, filePath.lastIndexOf('/') );
                      let currentName2 = imagePath2.substring(imagePath2.lastIndexOf('/'));
                     this.copyFileToLocalDir2(correctPath2, currentName2, this.createFileName2());
                  });
           
      });
  
  }

  takePicture3(sourceType: PictureSourceType) {
    var options3: CameraOptions = {
        quality: 100,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        allowEdit:false
    };

    this.camera.getPicture(options3).then(imagePath3 => {
     
            this.filePath.resolveNativePath(imagePath3)
                .then(filePath => {
                    let correctPath3 = filePath.substr(0, filePath.lastIndexOf('/') );
                    let currentName3 = imagePath3.substring(imagePath3.lastIndexOf('/'));
                   this.copyFileToLocalDir3(correctPath3, currentName3, this.createFileName3());
                });
         
    });

}
      copyFileToLocalDir(namePath, currentName, newFileName) {
        this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
            this.updateStoredImages(newFileName);
            
        }, error => {
            this.presentToast('Error while storing file.');
        });
    }

    copyFileToLocalDir2(namePath,currentName,newFileName) {
      this.file.copyFile(namePath,currentName,this.file.dataDirectory ,newFileName).then(_ =>{
      this.updateStoredImages2(newFileName);  
      }, error => {
      
        this.presentToast('Erreur lors de lenregistrement du fichier');
      });
      
      }

      copyFileToLocalDir3(namePath,currentName,newFileName) {
        this.file.copyFile(namePath,currentName,this.file.dataDirectory ,newFileName).then(_ =>{
        this.updateStoredImages3(newFileName);  
        }, error => {
        
          this.presentToast('Erreur lors de lenregistrement du fichier');
        });
        
        }
    
    
   updateStoredImages(name) {
    this.storage.get(STORAGE_KEY).then(images => {
        let arr = JSON.parse(images);
        if (!arr) {
            let newImages = [name];
            this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
        } else {
            arr.push(name);
            this.storage.set(STORAGE_KEY, JSON.stringify(arr));
        }

        let filePath = this.file.dataDirectory + name;
        let resPath = this.pathForImage(filePath);

        let newEntry = {
            name: name,
            path: resPath,
            filePath: filePath,
            imgtest :  name
           
        };
        this.startUpload(newEntry);
        this.images = [newEntry];
        this.imgtest=name;
        this.ref.detectChanges(); // trigger change detection cycle
    });
    
}

    updateStoredImages2(name2){
      this.storage.get(STORAGE_KEY2).then(imagess =>{
    let arr = JSON.parse(imagess);
    if(!arr){
      let newImages = [name2];
      this.storage.set(STORAGE_KEY2,JSON.stringify(newImages));
    }else{
      arr.push(name2);
      this.storage.set(STORAGE_KEY2,JSON.stringify(arr));
    }
    
    let filePath = this.file.dataDirectory +name2;
    let resPath = this.pathForImage2(filePath);
    
    let newEntry ={
      name2:name2,
      path2:resPath,
      filePath :filePath,
      imgtest2 :  name2
    };
    this.startUpload2(newEntry);
    this.imagess= [newEntry];
    this.imgtest2=name2;
    this.ref.detectChanges();
      })
    }

    updateStoredImages3(name3){
      this.storage.get(STORAGE_KEY3).then(imagesss =>{
    let arr = JSON.parse(imagesss);
    if(!arr){
      let newImages = [name3];
      this.storage.set(STORAGE_KEY3,JSON.stringify(newImages));
    }else{
      arr.push(name3);
      this.storage.set(STORAGE_KEY3,JSON.stringify(arr));
    }
    
    let filePath = this.file.dataDirectory +name3;
    let resPath = this.pathForImage3(filePath);
    
    let newEntry ={
      name3:name3,
      path3:resPath,
      filePath :filePath,
      imgtest3 :  name3
    };
    this.startUpload3(newEntry);
    this.imagesss= [newEntry];
    this.imgtest3=name3;
    this.ref.detectChanges();
      })
    }
    
    deleteImage(imgEntry, position) {
      this.images.splice(position, 1);
  
      this.storage.get(STORAGE_KEY).then(images => {
          let arr = JSON.parse(images);
          let filtered = arr.filter(name => name != imgEntry.name);
          this.storage.set(STORAGE_KEY, JSON.stringify(filtered));
  
          var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);
  
          this.file.removeFile(correctPath, imgEntry.name).then(res => {
              this.presentToast('Photo supprimé.');
          });
      });
  }

    deleteImage2(imgEntry,position){
      this.imagess.splice(position,1);
      this.storage.get(STORAGE_KEY2).then(imagess=>{
        let arr = JSON.parse(imagess);
        let filtered = arr.filter(name2 => name2 != imgEntry.name2);
        this.storage.set(STORAGE_KEY2,JSON.stringify(filtered));
    
        var correctPath = imgEntry.filePath.substr(0,imgEntry.filePath.lastIndexOf('/')+1);
        this.file.removeFile(correctPath,imgEntry.name2).then(res =>{
          this.presentToast('Fichier supprimé.');
        });
      })
    }

    deleteImage3(imgEntry,position){
      this.imagesss.splice(position,1);
      this.storage.get(STORAGE_KEY3).then(imagesss=>{
        let arr = JSON.parse(imagesss);
        let filtered = arr.filter(name3 => name3 != imgEntry.name3);
        this.storage.set(STORAGE_KEY3,JSON.stringify(filtered));
    
        var correctPath = imgEntry.filePath.substr(0,imgEntry.filePath.lastIndexOf('/')+1);
        this.file.removeFile(correctPath,imgEntry.name3).then(res =>{
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
    startUpload2(imgEntry){
     
      this.file.resolveLocalFilesystemUrl(imgEntry.filePath).then(entry =>{
        (<FileEntry>entry).file( file => this.readFile(file))
      
      })
      .catch(err =>{
        this.presentToast('Erreur de lecture du fichier');
      })
   
    }

    startUpload3(imgEntry){
   
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
    readFile2(file: any){ 
      const reader = new FileReader();
      reader.onloadend = () =>{
        const formData2 = new FormData();
        const imgBlob = new Blob([reader.result],{
          type:file.type
        });
        formData2.append('file',imgBlob ,file.name2);
        this.uploadImageData2(formData2);
      };
      reader.readAsArrayBuffer(file);
    }

    readFile3(file: any){ 
      const reader = new FileReader();
      reader.onloadend = () =>{
        const formData3 = new FormData();
        const imgBlob = new Blob([reader.result],{
          type:file.type
        });
        formData3.append('file',imgBlob ,file.name3);
        this.uploadImageData2(formData3);
      };
      reader.readAsArrayBuffer(file);
    }
    async uploadImageData(formData : FormData){
      const loading = await this.loadingController.create({
    //content :'Uploading image...',
      });
    
      await loading.present();
    
      this.http.post("https://mobile.bijouteriess.com/server_api/uploadislam1.php",formData).
      pipe(
        finalize(()=>{
          loading.dismiss();
        })
      )
      .subscribe(res =>{
        if(res['success']){
          this.presentToast('La Photo de  l\'achat est bien chargé')
          
        } else{
          
          this.presentToast('La Photo de  l\'achat  a echoué')
        }
      })
    
    }

    async uploadImageData2(formData : FormData){
      const loading = await this.loadingController.create({
    //content :'Uploading image...',
      });
    
      await loading.present();
    
      this.http.post("https://mobile.bijouteriess.com/server_api/uploadislam1.php",formData).
      pipe(
        finalize(()=>{
          loading.dismiss();
        })
      )
      .subscribe(res =>{
        if(res['success']){
          this.presentToast('La Photo Recto est bien téléchargé')
        } else{
          
          this.presentToast('La Photo Recto a echoué')
        }
      })
    
    }

    async uploadImageData3(formData : FormData){
      const loading = await this.loadingController.create({
    //content :'Uploading image...',
      });
    
      await loading.present();
    
      this.http.post("https://mobile.bijouteriess.com/server_api/uploadislam1.php",formData).
      pipe(
        finalize(()=>{
          loading.dismiss();
        })
      )
      .subscribe(res =>{
        if(res['success']){
          this.presentToast('La Photo Verso est bien téléchargé')
        } else{
          
          this.presentToast('La Photo Verso a echoué')
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
    
    
    createFileName() {
      var d = new Date(),
          n = d.getTime(),
          newFileName = n + ".jpg";
      return newFileName;
    
  }
      createFileName2(){
        var d = new Date(),
        n = d.getTime(),
        newFileName = n + ".jpg";
        return newFileName;
      }
      createFileName3(){
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
     

}


