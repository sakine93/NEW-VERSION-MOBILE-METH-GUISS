import {ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController,AlertController, ModalController, LoadingController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/storage';
import { QRCodeModule } from 'angularx-qrcode';
import { Network } from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { CustomerPage } from '../customer/customer.page';
import {Injectable, Pipe, PipeTransform} from '@angular/core';
import { UpdateitemPage } from '../updateitem/updateitem.page';
import { ActionSheetController, Platform } from '@ionic/angular';
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
  selector: 'app-inventaire',
  templateUrl: './inventaire.page.html',
  styleUrls: ['./inventaire.page.scss'],
})
export class InventairePage implements OnInit {
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
  term = '';
  customers: any = [];
  customersbarcodes: any =[];
  infostock:any=[];
  infosventes:any=[];
  limit: number = 10;
  start: number = 0;
  username: string;
  id:any;
  anggota: any;
  comment:string;
  search = {'name': ' '}
  codeacces: any;
  phone_number:any;
  item_location:number;
  pet:any;
  totallus:any;
  totalstock:any;
  totalstockpoids:any;
  totalstockpiece:any;
  totalstocklus:any;
  nbrepiece:any;
  nbre:any;
  require:any;
  num_sale:number=0;
  recording:boolean =false;
  public myAngularxQrCode: string = 'null'; 
  backupUpUsers: any = [];
  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    public toastController: ToastController,
    private storage: Storage,
    public network:Network,
    public dialog:Dialogs,
    public alertCtrl:AlertController,
    private modalCtrl :ModalController,
    private plt:Platform,
    private file:File,
    private webview:WebView,
    private camera:Camera,
    private http:HttpClient,
    private ref: ChangeDetectorRef,
    private actionSheetController:ActionSheetController,
    private loadingController:LoadingController,
    private filePath: FilePath,
    private platform: Platform
    
  ) { 
    this.verif();
    this.ionViewWillEnter();
    this.createQRCode();
    this.pet='caisse';
    
    this.network.onDisconnect().subscribe(()=>{
    
    this.recording =false;
  
    });
    this.network.onConnect().subscribe(()=>{
    this.recording=true;
    })
  }
  slidesOptions = {
    slidesPerView: 1.5
  }
  createQRCode() {
    this.myAngularxQrCode = this.phone_number;
    this.phone_number = "";
  }

  

  dismissModal(){
 
    this.modalCtrl.dismiss();
    
  }

  //TRAITEMENT IMAGE 

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
      async selectImage() {
        const actionSheet = await this.actionSheetController.create({
            header: "Veuillez choisir la photo de l'achat",
            buttons: [
                {
                    text: 'Prendre une Photo',
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
    
      takePicture(sourceType:PictureSourceType){
        var options: CameraOptions ={
          quality:100,
          sourceType:sourceType,
          saveToPhotoAlbum:false,
          correctOrientation:true,
          cameraDirection: 1,
          allowEdit: true,
          targetHeight: 100,
          targetWidth: 100
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


async updateProses(imgtest,id) {
  //alert(id);
  let body = {
  
    aksi: 'updatephoto',
    item_id:id,

    pic_filename : imgtest,
  
   // num_sale : this.name,
  
 
  };
  this.postPvdr.postData(body, 'file_aksi.php').subscribe( async data => {
    var alertpesan = data.msg;
    if (data.success) {
      
      this.pet= 'puppies';
      
      const toast = await this.toastController.create({
        message: 'PHOTO BIEN MODIFIE',
        duration: 2000
      });
      toast.present();
      this.ionViewWillEnter();

    } else {
      const toast = await this.toastController.create({
        message: 'Ce numero de sachet est deja utilisé',
        duration: 2000
      });
    }
  });



}

  //TRAITEMENT IMAGE 

  filterItems(searchTerm) {
    console.log(searchTerm);
    return this.backupUpUsers.filter(customer => {
        return customer.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
}

searchAndFilterItems(searchTerm) {
  const filteredItems = this.customers.filter(item => {
      // Apply filters
  });
  return filteredItems.filter(item => {
    return filteredItems.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
  });
}
photos(item_id){
  this.pet= 'photos';
  this.id=item_id;
  this.imgtest='';
}

  retouranull(){
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    this.ionViewWillEnter();
    this.createQRCode();
  }
montrer(){
  this.showAlert();
}

payment(){
  let paymentRequestUrl = "https://paytech.sn/api/payment/request-payment";
  //let fetch = this.require('node-fetch');// http client
  let params = {
  item_name:"Iphone 7",
  item_price:"560000",
  currency:"XOF",
  ref_command:"HBZZYZVUZZZV",
  command_name:"Paiement Iphone 7 Gold via PayTech",
  env:"prod",
  ipn_url:"https://mobile.khelcomgold.com/ipn",
  success_url:"http://mobile.khelcomgold.com/success",
  cancel_url:"http://mobile.khelcomgold.com/cancel",
  custom_field:JSON.stringify({
     custom_fiel1:"value_1",
     custom_fiel2:"value_2",
  })
  };

  let headers = {
  Accept: "application/json",
  'Content-Type': "application/json",
  "Access-Control-Allow-Origin": "*",
  API_KEY:"f86ab0aee1ae55d39e6924f7e9420fa2753525eb75de24e3302fb96e0eed4d9f",
  API_SECRET:"2ac585a09834ad412309a170b48fa166dca71284692d2f3976b96123675bcb5b",
  };

  fetch(paymentRequestUrl, {
  method:'POST',
  mode:'no-cors',
  body:JSON.stringify(params),
  headers: headers
  })
  .then(function (response) {
  return response.json()
  })
  .then(function (jsonResponse) {
  console.log(jsonResponse)
  /*
  {
      "success":1,
      "redirect_url":"https://paytech.sn/payment/checkout/98b1c97af00c8b2a92f2",
    token:"98b1c97af00c8b2a92f2"}

  */
  })
}
  
  async showAlert() {
    await this.alertCtrl.create({
header:"Entrer le nom et telephone du Client",
inputs:[
  {
type:'text',name:'comment',placeholder:'Prenom et Nom du client'


},
{
  type:'text',name:'comment2',placeholder:'Numero de telephone',
  
  
},
{
  type:'number',name:'telnumber',placeholder:'Adresse du client',
  
  
}

],

buttons:[
{text:'Valider',handler:(res)=>{
  this.comment=res.comment;

}

},{
text:"Annuler"
}
]
    }).then(res =>res.present());
  }

  validertableau(){
    this.showConfirmvente();
  }

  async showConfirmvente() {
    await this.alertCtrl.create({
header:"Voulez vous Confirmer la lecture de ce plateau ",

buttons:[
{text:'Confirmer',handler:(res)=>{

  if(this.comment==''){
    alert('Entrer les infos du clients svp');
   // this.closeCamera();
  }else{
    //this.playaudio();
    this.createdProses();
  }
  

}

},{
text:"Annuler",handler:(res)=>{
 

}
}
]
    }).then(res =>res.present());
  }

  ionViewWillEnter() {
    this.customers = [];
    this.customersbarcodes = [];
    this.infostock=[];
    this.infosventes=[];
    this.start = 0;
    this.loadCustomer();
    this.loadCustomerbijoux();
    this.storage.get('session_storage').then((res) => {
      this.anggota = res;
      this.username = this.anggota.username;
      this.codeacces = this.anggota.codeacces;
      this.phone_number = this.anggota.phone_number;
      this.item_location = this.anggota.item_location;
      this.nbre= 0;
    });
  }

  async proseslogout() {
    this.storage.clear();
    this.router.navigate(['/login']);
    const toast = await this.toastController.create({
      message: 'Logout successful',
      duration: 2000
     });
    toast.present();

  }


  addCustomer() {
  //  alert('test');
    this.router.navigate(['/scaninventaire']);
  }

 


  addCustomerb() {
    this.router.navigate(['/addcustomer']);
  }

 


  
  voirPhoto(name) {
    alert('non dispo pour le moment');
   // this.router.navigate(['/listebijoux/' + name ]);
  }

  menuApp(){
     this.router.navigate(['customer']);
  }

  showCustomer(id, name, item_unit_price) {
    this.router.navigate(['/showcustomer/' + id + '/' + name + '/' + item_unit_price + '/']);
  }
  envoicaisse(){
    alert('je marche lenvoie...');
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ionViewWillEnter();
      this.controle();
      event.target.complete();
    }, 500);
  }

  loadData(event: any) {
    this.start += this.limit;
    setTimeout(() => {
    this.loadCustomer().then(() => {
    event.target.complete();
    });
    }, 500);
  }


  delCustomers(id) {
    let body = {
        aksi: 'deleteinventaire',
        num_sale : id
      };

    this.postPvdr.postData(body, 'file_aksi.php').subscribe(data => {
        this.ionViewWillEnter();
      });
  }

  loadCustomer() {
    return new Promise(resolve => {
      let body = {
        aksi: 'gettotalstock',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
        item_location : this.item_location,
      };

      let body2 = {
        aksi: 'gettotallus',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
        //item_location : this.item_location,
      };
       let body3 = {
        aksi: 'gettotalnonlus',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
        item_location : this.item_location,
      };
      let body4 = {
        aksi: 'gettotalvalide',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
        item_location : this.item_location,
      };

      let body5 = {
        aksi: 'gettotalbarcode',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
        item_location : this.item_location,
      };
      let body6 = {
        aksi: 'gettotalbarcodevitrine',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
        item_location : this.item_location,
      };
      

      

      this.postPvdr.postData(body, 'file_aksi.php').subscribe(data => {
        for (let customer of data.result) {
         
          this.customers.push(customer);
         
        }
        resolve(true);
      });

      this.postPvdr.postData(body2, 'file_aksi.php').subscribe(data => {
        for (let customer of data.result) {
          this.nbre =0;
          this.totallus = customer.totallus;
         // this.nbrepiece= customer.nbrepiece;
        
         
        }
        resolve(true);
      });

      this.postPvdr.postData(body3, 'file_aksi.php').subscribe(data => {
        for (let customer of data.result) {
          this.nbre =0;
          this.totalstock = customer.totalstock;
         // this.nbrepiece= customer.nbrepiece;
        
         
        }
        resolve(true);
      });

      this.postPvdr.postData(body4, 'file_aksi.php').subscribe(data => {
        for (let customer of data.result) {
          this.nbre =0;
          this.totalstocklus = customer.totalstocklus;
         // this.nbrepiece= customer.nbrepiece;
        
         
        }
        resolve(true);
      });

      this.postPvdr.postData(body5, 'file_aksi.php').subscribe(data => {
        for (let customerb of data.result) {
         
          this.customersbarcodes.push(customerb);
      
          this.totalstock = parseFloat(customerb.totalstock).toFixed(0);
        }
        resolve(true);
        
      });

      this.postPvdr.postData(body6, 'file_aksi.php').subscribe(data => {
        for (let customerp of data.result) {
         
         // this.customersbarcodes.push(customerp);
          this.verif();
          this.totalstockpoids = parseFloat(customerp.totalstockpoids).toFixed(2);
          this.totalstockpiece = parseFloat(customerp.totalstockpiece).toFixed(0);
        }
        resolve(true);
        
      });


    });
  }

  loadCustomerbijoux() {
    return new Promise(resolve => {
      let body = {
        aksi: 'getbijouxinfostock',
        limit : this.limit,
        start : this.start,
        codeacces : this.term,
        item_location : this.item_location,
      };
      let body1 = {
        aksi: 'getbijouxinfovente',
        limit : this.limit,
        start : this.start,
        codeacces : this.term,
        item_location : this.item_location,
      };

      this.postPvdr.postData(body, 'file_aksi.php').subscribe(data => {
        for (let venteb of data.result) {
         
          this.infostock.push(venteb);
          break;
         
        }
        resolve(true);
      });
      this.postPvdr.postData(body1, 'file_aksi.php').subscribe(data => {
        for (let venteb of data.result) {
          this.infosventes.push(venteb);
          break; // arrête la boucle après avoir ajouté le premier élément
        }
        resolve(true);
      });
      

    

    });
  }

  updateItems(id,category,type_or) {
    alert(id+category+type_or);
    this.router.navigate(['/updateitem/' + id + '/' + category + '/' + type_or+ '/']);
   // this.router.navigate(['customer']);
  }

  verifbarcode(){
    this.loadCustomerbijoux();
  }

  async verif(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Mise a jour des données en cours...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
   // this.loadCustomer();
  }

  controle(){
    var startTime = new Date().getTime();
    var img = new Image();
    img.onload = function() {
        var loadtime = new Date().getTime() - startTime;
        checkConnectionSpeed(loadtime);
    };
    img.src = "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?"+startTime;
    function checkConnectionSpeed(millisecond) {
        var x = document.getElementById("connection-message");
        if (millisecond > 5000) {
            x.style.background = 'red';
            x.style.fontSize = 'bold';
          //  x.innerHTML = '<ion-icon style="color: #fff;"  name="wifi" slot="start"></ion-icon>'
            //+''+' Connexion  trop lente !';
           // x.style.color = '#fff';
          
        }else if(millisecond > 3000){
            x.style.background = 'orange';
            x.style.fontSize = 'bold';
           // x.innerHTML = '<ion-icon style="color: #fff;"  name="wifi" slot="start"></ion-icon>'
            //+''+' Connexion  faible !';
           // x.style.color = '#000';
           
        }else{
            x.style.background = 'green';
           // x.style.color = '#fff';
            x.style.height='15px';
            x.innerHTML = '<ion-icon style="color: #fff;"  name="wifi" slot="start"></ion-icon>'
           // +''+'! Conexion stable';
            
           
        }
    }
   }
  

  async createdProses() {
     if(this.comment==''){
      const toast = await this.toastController.create({
        message: 'Les infos du clients st obligatoires',
        duration: 2000
      });
    }
   
     else {
      let body = {
        aksi: 'marquelu',
        comment : this.comment,
     
       // sale_status : '1',
        codeacces:this.codeacces,
        item_location : this.item_location,
       
       
      };
      this.postPvdr.postData(body, 'file_aksi.php').subscribe( async data => {
        var alertpesan = data.msg;
        if (data.success) {
          
          const toast = await this.toastController.create({
            message: 'Les barcodes ont été bien validés',
            duration: 2000
          });
          toast.present();
          this.ionViewWillEnter();
        } else {
          const toast = await this.toastController.create({
            message: alertpesan,
            duration: 2000
          });
        }
      });
    }
  }
}
