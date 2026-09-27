import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { async } from 'q';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Storage } from '@ionic/storage';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-barcodes',
  templateUrl: './barcodes.page.html',
  styleUrls: ['./barcodes.page.scss'],
})
export class BarcodesPage implements OnInit {

  public category:any ='';
  comment: any = '';

  heure : Date = new Date();
  name :string ='';
  reffacture :any ='';
  totalitems :any;
  nbre:number;
  items: any = [];
  limit: number = 10;
  start: number = 0;
  //sale_status: string = '';
  item_id: string = '';
 
  quantity: number = 0;
  poids: number = 0;
  item_location: any = '';
  prix_du_g :number;
 
  sale_id: number;
  codeacces: any;
  username:string='';

  anggota: any;
  public showCamera = false;
  public titre: any = '';
  isFlashlight = false;
  constructor(  private postPvdr: PostProvider,
    private router: Router,
    public toastController: ToastController,
    private actRoute: ActivatedRoute,
    private storage: Storage,
    private qrScanner: QRScanner,
    private torchLight: Flashlight,
    private nativeAudio: NativeAudio, 
    private alertCtrl:AlertController,
    private barcodeScanner: BarcodeScanner,
    ) { 
     // this.getRandomString(4);
   //   this.reffacture=cryptoRandomString({length: 10, characters: 'abc'});

         // this.scanCode();
     //this.scanBarcode();
     this.ionViewWillEnter();
      
    }

     getRandomString(length) {
      var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var result = '';
      for ( var i = 0; i < length; i++ ) {
          result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
          this.reffacture = result;
        }
      return this.reffacture;
  }
  
  //usage: getRandomString(20); // pass desired length of random string
  
    ionViewWillEnter() {
      this.items = [];
      this.start = 0;
      this.loadItems();
      this.storage.get('session_storage').then((res) => {
        this.anggota = res;
        this.username = this.anggota.username;
        this.codeacces = this.anggota.codeacces;
        this.item_location = this.anggota.item_location;
        this.nbre= 0;
      });
    }

  ngOnInit() {
   // this.getRandomString(4);
  }
  onChange($event){
    //console.log($event.target.value);
    if($event.target.value=='Bagues'){
      this.name = ('BG10');
      this.prix_du_g =0;
    }
    if($event.target.value=='Bracelets'){
      this.name = ('BR23');
      this.prix_du_g =0;
    }
    if($event.target.value=='Sautoirs'){
      this.name = ('ST51');
      this.prix_du_g =0;
    }
    if($event.target.value=='Ensemble'){
      this.name = ('EM854');
      this.prix_du_g =0;
    }
    if($event.target.value=="Boucle Doreille"){
      this.name = ('BD31');
      this.prix_du_g =0;
     // console.log($event.target.value);
    }
    if($event.target.value=='Chaines'){
      this.name = ('CH43');
      this.prix_du_g =0;
    }
    if($event.target.value=='Pendentifs'){
      this.name = ('PD773');
      this.prix_du_g =0;
    }
    if($event.target.value=='Vice'){
      this.name = ('VC71');
      this.prix_du_g =0;
    }
    if($event.target.value=='Parrures'){
      this.name = ('PR75');
      this.prix_du_g =0;
    }
    if($event.target.value=='Pierre'){
      this.name = ('PE90');
      this.prix_du_g =0;
    }
    if($event.target.value=='Piercing'){
      this.name = ('PC898');
      this.prix_du_g =0;
    }
    if($event.target.value=='Fetiche'){
      this.name = ('FE854');
      this.prix_du_g =0;
    }
    if($event.target.value=='Chapelet'){
      this.name = ('CP547');
      this.prix_du_g =0;
    }
    if($event.target.value=='Colliers'){
      this.name = ('CO267');
      this.prix_du_g =0;
    }
   


   
   
    //console.log($event);

    }

  doRefresh(event) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }

  loadData(event: any) {
    this.start += this.limit;
    setTimeout(() => {
    this.loadItems().then(() => {
    event.target.complete();
    });
    }, 500);
  }


  delItems(id) {
    let body = {
        aksi: 'deleteitems',
        item_id : id
      };

    this.postPvdr.postData(body, 'file_aksi.php').subscribe(data => {
        this.ionViewWillEnter();
      });
  }

  loadItems() {
    return new Promise(resolve => {
      let body = {
        aksi: 'getbarcodesliste',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
      };

      let body2 = {
        aksi: 'gettotalbarcodes',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
      };

      this.postPvdr.postData(body, 'file_aksi.php').subscribe(data => {
        for (let item of data.result) {
         
          this.items.push(item);
         
        }
        resolve(true);
      });

      this.postPvdr.postData(body2, 'file_aksi.php').subscribe(data => {
        for (let item of data.result) {
          this.nbre =0;
          this.totalitems =item.totalitems;
        
         
        }
        resolve(true);
      });
    });
  }
  

 

 


  retourachat(){
    this.router.navigate(['/barcodes']);
  }

  updateItem(id,category,type_or) {
    this.router.navigate(['/updateitem/' + id + '/' + category + '/' + type_or+ '/']);
  }
  





  async showAlert() {
    await this.alertCtrl.create({
header:"#Retenez bien Ce Code#",
inputs:[
{
  label:'REF - FACTURE ',
  type:'text', disabled:true, name:'reffacture',value:this.getRandomString(4)
  
}

],

buttons:[
{text:'Valider et Termine',handler:(res)=>{
  this.reffacture=res.reffacture;
 
  this.createdProsesitemsUpdate();

}

},{
text:"Annuler"
}
]
    }).then(res =>res.present());
  }
 
  async createdProsesitems() {
    
    if(this.titre==''){
     
      alert('Aucun titre choisi')
    }else if(this.name==''){
      alert('Aucune categorie choisie')
    } 
    else if(this.prix_du_g==0){
      alert('Metter votre prix de revient')
    }  
    else{
      let body = {
        aksi: 'additems',
        //comment : this.comment,
        item_location:this.item_location,
        titre : this.titre,
        category:this.category,
        prix_du_g:this.prix_du_g,
        heure:this.heure,
        //reffacture:this.reffacture,
        name:this.name,
       // sale_status : '1',
        codeacces:this.codeacces,
        username:this.username,
       // quantity:this.quantity,
         poids:this.poids,
        //item_location:this.item_location
       
      };
      this.postPvdr.postData(body, 'file_aksi.php').subscribe( async data => {
        var alertpesan = data.msg;
        if (data.success) {
        //  this.closeCameraachat();
          //this.router.navigate(['/barcodes']);
          this.ionViewWillEnter();
         
          
        } else {
         
          const toast = await this.toastController.create({
            message: 'Erreur Ce titre est deja Scanner ',
            duration: 2000
          });
          toast.present();
         
        }
        
      });
    }
    
    
  
}


async createdProsesitemsUpdate() {
  if(this.name==''){
    const toast = await this.toastController.create({
      message: 'Aucune numero de facture',
      duration: 2000
    });
  } 
  else{
    let body = {
      aksi: 'finalisebarcode',
      //comment : this.comment,
      titre : this.titre,
      category:this.category,
      reffacture:this.reffacture,
      name:this.name,
     // sale_status : '1',
      codeacces:this.codeacces,
      username:this.username,
     // quantity:this.quantity,
       poids:this.poids,
      //item_location:this.item_location
     
    };
    this.postPvdr.postData(body, 'file_aksi.php').subscribe( async data => {
      var alertpesan = data.msg;
      if (data.success) {
      //  this.closeCameraachat();
      this.name='';
      
        this.router.navigate(['/customer']);
        this.ionViewWillEnter();
       
        
      } else {
       
        const toast = await this.toastController.create({
          message: 'Erreur Ce titre est deja Scanner ',
          duration: 2000
        });
        toast.present();
       
      }
      
    });
  }
  
  

}


}
