import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerPage } from '../customer/customer.page';
import { ToastController,AlertController,LoadingController, ModalController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/storage';
import { QRCodeModule } from 'angularx-qrcode';
import { Network } from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { ChoixtitreComponent } from '../choixtitre/choixtitre.component';

@Component({
  selector: 'app-titrevendre',
  templateUrl: './titrevendre.page.html',
  styleUrls: ['./titrevendre.page.scss'],
})
export class TitrevendrePage implements OnInit {
  sliderConfig = {
    spaceBetween: 1,
    slidesPerView: 1.2,
  };
  scannedData: any;
  encodedData: '';
  pet:any;
  encodeData: any;
  inputData: any;
  qrData = null;
  createdCode = null;
  scannedCode = null;
  item_id: any ;
  customers: any = [];
  customerstockdetaille:any=[];
  customerstocktransferts:any=[];
  customerstocktransfertsant:any=[];
  customersrangou:any=[];
  customerstockb:any=[];

  limit: number = 0;
  start: number = 0;
  username: string;
  anggota: any;
  comment:string;
  totalapayer:any;
  codeacces: any;
  phone_number:any;
  item_location:number;
  totalvente:any;
  nbrepiece:any;
  nbre:any;
  require:any;
  num_sale:number=0;
  descriptions:string;
  details:string;
  recording:boolean =false;
  public myAngularxQrCode: string = 'null'; 
  
  slider: any;
    slideOptions = {
    initialSlide: 1,
    slidesPerView: 0,
    slidesToScroll: 1
 
  };
 
  quantity: number = 0;
  prix_vente_g:number;
  poids: number = 0;
  public item_locationss: number ;
 
  public showCamera = false;
  public textScanned: any = '';
  isFlashlight = false;

  constructor(private router: Router,private modalCtrl :ModalController,
     private postPvdr: PostProvider,

  
    public toastController: ToastController,
    private storage: Storage,
    private alertCtrl:AlertController,
    public network:Network,
      public dialog:Dialogs,
      private barcodeScanner: BarcodeScanner,
      public loadingController: LoadingController
     ) {
      this.controle();
      this.pet="caisse";
      }
    
    
     
    

      async caisse() {
        this.pet="caisse";
      }
      async seg2() {
        this.pet="stocb";
      }

      async seg3() {
        this.pet="puppies";
      }

      async seg4() {
        this.pet="star";
      }

      async seg6() {
        this.pet="strans";
      }

  ngOnInit() {
    //this.ionViewWillEnter();
  }

  dismissModal(){
 
    this.modalCtrl.dismiss();
    
  }
  retouranull(){
    this.modalCtrl.dismiss();
  }

  add18k(){
    alert('ajout de 18k');
  }
  async qrcodeexist() {
    this.verifCode();
    if (this.poids == 0) {
      this.presentLoading();
      
    

    }
   
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
      this.controle();
    }, 100);
  }


  async showAlert() {
    await this.alertCtrl.create({
header:"",
message:'Un bijoux detecté en vente Voulez vous confimer le scan ?',

buttons:[
{text:'Confirmer',handler:(res)=>{
  this.verifCode();
  if(this.poids==0){
   
    alert('Erreur Ce Bijoux n\'est pas  reconnu dans le system');
  
  }else{
    //this.playaudio();
    //this.createdProses();
  }
  

}

},{
text:"Annuler",handler:(res)=>{


}
}
]
    }).then(res =>res.present());
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Recherche du bijoux en cours...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.showAlert();
  }



  verifCode(){
    return new Promise(resolve => {
      let body = {
        aksi: 'getqrcode',
        //limit : this.limit,
        //start : this.start,
        item_id : 120,
        item_location:this.item_locationss,
      };

      this.postPvdr.postData(body, 'file_aksi.php').subscribe(data => {
        for (let customer of data.result) {
          this.customers.push(customer);
          this.poids = customer.poids;
          this.quantity=customer.quantity;
          this.prix_vente_g = customer.prix_vente_g;
         // this.item_location=customer.item_location;

        }
        resolve(true);
      });
    });
  }

async bilalvalide(item_id,poids,codeboutique){
  this.item_id = item_id;
 

  this.createdProsesTR(item_id,poids,codeboutique);
}

async bilalvalide2(name,item_id,poids,codeboutique,quantity){
  this.item_id = item_id;
 

  this.createdProsesTR2(item_id,poids,codeboutique,quantity,name);
}

async bilalvalidesg(name,item_id,poids,codeboutique,quantity){
  this.item_id = item_id;
 

  this.createdProsesTR3(item_id,poids,codeboutique,quantity,name);
}

  async presentAlertRadio(item_id) {
    const alert = await this.alertCtrl.create({
      header: 'Type de bijoux !'+item_id,

      

      inputs: [
        {
          name: 'boucle D\'oreille',
          type: 'checkbox',
          label: 'Boucle D\'oreille',
          value: 'boucle Doreille',
          
        },
        {
          name: 'bagues',
          type: 'checkbox',
          label: 'Bagues',
          value: 'bagues'
        },
        {
          name: 'bracelets',
          type: 'checkbox',
          label: 'Bracelets',
          value: 'bracelets'
        },
        {
          name: 'chaines',
          type: 'checkbox',
          label: 'Chaines',
          value: 'chaines'
        },
        {
          name: 'colliers',
          type: 'checkbox',
          label: 'Colliers',
          value: 'colliers'
        },
        {
          name: 'parrures',
          type: 'checkbox',
          label: 'Parrures',
          value: 'parrures'
        },
        {
          name: 'pendentifs',
          type: 'checkbox',
          label: 'Pendentifs',
          value: 'pendentifs'
        },
        {
          name: 'sautoirs',
          type: 'checkbox',
          label: 'Sautoirs',
          value: 'sautoirs'
        },
        {
          name: 'diamant',
          type: 'checkbox',
          label: 'Diamant',
          value: 'diamant'
        },
        {
          name: 'pierre',
          type: 'checkbox',
          label: 'Pierre',
          value: 'pierre'
        },
        {
          name: 'percing',
          type: 'checkbox',
          label: 'Percing',
          value: 'percing'
        },
        {
          name: 'montres',
          type: 'checkbox',
          label: 'Montres',
          value: 'montres'
        },
        {
          name: 'chapelet',
          type: 'checkbox',
          label: 'Chapelet',
          value: 'chapelet'
        }
      ],
      buttons: [
        {
          text: 'Valider et Continue',
          handler: (data) => {
            this.item_id = item_id;
            this.details='-'+data;
            console.log(data);
            this.createdProses(this.details);
           // this.presentAlertStock(this.details);
            if(data==''){
            // this.echecAppel();
            }else{
              this.details='-'+data;
            }
           
  
          }
        },
        {
          text: 'Annuler la  vente',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });
  
    await alert.present();
  }


  // liste vendeur stock

  async presentAlertStock(details) {
    const alert = await this.alertCtrl.create({
      header: 'Valider ',

      

      inputs: [
        {
          name: 'Stock Boutique',
          type: 'radio',
          label: 'Stock Boutique',
          value: '7',
          
        },
        {
          name: 'Stock Pape Seye',
          type: 'radio',
          label: 'Stock Pape Seye',
          value: '24',
          
        },
        {
          name: 'Stock Adji',
          type: 'radio',
          label: 'Stock Adji',
          value: '20'
        },
        {
          name: 'Stock Ahmeth Sy',
          type: 'radio',
          label: 'Stock Ahmeth Sy',
          value: '35'
        },
        {
          name: 'Stock Beukeury Niass',
          type: 'radio',
          label: 'Stock Beukeury Niass',
          value: '18'
        },
        {
          name: 'Stock Dame Diallo',
          type: 'radio',
          label: 'Stock Dame Diallo',
          value: '25'
        },
        {
          name: 'Stock Issa Thiam',
          type: 'radio',
          label: 'Stock Issa Thiam',
          value: '28'
        },
        {
          name: 'Stock Mamadou Niang',
          type: 'radio',
          label: 'Stock Mamadou Niang',
          value: '23'
        },
        
        {
          name: 'Stock Modou Sylla',
          type: 'radio',
          label: 'Stock Modou Sylla',
          value: '26'
        },
        {
          name: 'Stock Saliou Niang',
          type: 'radio',
          label: 'Stock Saliou Niang',
          value: '27'
        },{
          name: 'Stock Serigne Macke',
          type: 'radio',
          label: 'Stock Serigne Macke',
          value: '8'
        }
      ],
      buttons: [
        {
          text: 'Valider ->',
          handler: (data) => {
            this.item_location =data;
           this.descriptions='--'+details;
            //console.log(data);
           // this.createdProses();
            if(data==''){
           //  this.echecAppel();
            }else{
             // this.openadresse();
            }
           
  
          }
        },
        {
          text: 'Annuler Ma demande',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });
  
    await alert.present();
  }

  //fin liste vendeur stock
    

  loadCustomer() {
    return new Promise(resolve => {
      let body = {
        aksi: 'getalltitres',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
        item_location : this.item_location,
      };

      let body2 = {
        aksi: 'gettotal',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
        item_location : this.item_location,
      };

      let body3 = {
        aksi: 'getalltitremonstaok',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
        item_location : this.item_location,
      };
      let body4 = {
        aksi: 'getalltitrerangou',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
        item_location : this.item_location,
      };
      let body5 = {
        aksi: 'getalltitredetaille',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
        item_location : this.item_location,
      };
      let body6 = {
        aksi: 'getalltitretransferts',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
        item_location : this.item_location,
      };
      let body7 = {
        aksi: 'getalltitretransfertsant',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
        item_location : this.item_location,
      };

      this.postPvdr.postData(body, 'file_aksi.php').subscribe(data => {
        for (let customer of data.result) {
         
          this.customers.push(customer);
         // this.meseur='Aucun bijoux en vente ?';
        
         
        }
        resolve(true);
      });

      this.postPvdr.postData(body2, 'file_aksi.php').subscribe(data => {
        for (let customer of data.result) {
          this.nbre =0;
          this.totalvente = parseFloat(customer.totalvente).toFixed(0);
          this.nbrepiece= customer.nbrepiece;
        
         
        }
        resolve(true);
      });
      this.postPvdr.postData(body3, 'file_aksi.php').subscribe(data => {
        for (let customer of data.result) {
         
          this.customerstockb.push(customer);
         // this.meseur='Aucun bijoux en vente ?';
        
         
        }
        resolve(true);
      });
      this.postPvdr.postData(body4, 'file_aksi.php').subscribe(data => {
        for (let customer of data.result) {
         
          this.customersrangou.push(customer);
         // this.meseur='Aucun bijoux en vente ?';
        
         
        }
        resolve(true);
      });
      this.postPvdr.postData(body5, 'file_aksi.php').subscribe(data => {
        for (let customer of data.result) {
         
          this.customerstockdetaille.push(customer);
         // this.meseur='Aucun bijoux en vente ?';
        
         
        }
        resolve(true);
      });
      this.postPvdr.postData(body6, 'file_aksitrislam1.php').subscribe(data => {
        for (let customer of data.result) {
         
          this.customerstocktransferts.push(customer);
          console.log('aasane id '+customer.item_id);
         // this.meseur='Aucun bijoux en vente ?';
        
         
        }
        resolve(true);
      });
      this.postPvdr.postData(body7, 'file_aksitrAnta.php').subscribe(data => {
        for (let customer of data.result) {
         
          this.customerstocktransfertsant.push(customer);
          console.log('aasane id '+customer.item_id);
         // this.meseur='Aucun bijoux en vente ?';
        
         
        }
        resolve(true);
      });
    });
  }
  

  ionViewWillEnter() {
    this.customers = [];
    this.customerstockdetaille=[];
    this.customersrangou=[];
    this.customerstockb=[];
    this.customerstocktransferts=[];
    this.customerstocktransfertsant=[];
    this.start = 0;
    this.loadCustomer();
    this.storage.get('session_storage').then((res) => {
      this.anggota = res;
      this.username = this.anggota.username;
      this.codeacces = this.anggota.codeacces;
      this.phone_number = this.anggota.phone_number;
      this.item_location = this.anggota.item_location;
      this.nbre= 0;
    });
  }

  async createdProses(details) {
    
    if (this.item_id == 0) {
      alert('Erreur Qr code');
      // this.closeCamera();
       //this.scanCode();
     }else{
      let body = {
        aksi: 'add',
        //comment : this.comment,
        item_id : this.item_id,
        descriptions:this.details,
       // sale_status : '1',
        codeacces:this.codeacces,
        quantity:this.quantity,
         poids:this.poids,
        item_location:this.item_location,
        prix_vente_g:0,
       
      };
      this.postPvdr.postData(body, 'file_aksi.php').subscribe( async data => {
        var alertpesan = data.msg;
        if (data.success) {
          this.retouranull();
          
        } else {
        
          const toast = await this.toastController.create({
            message: 'Erreur Ce bijoux est deja Scanner ',
            duration: 2000
          });
          toast.present();
         
        }
        
      });
    
  }
}


async createdProsesTR(item_id,poids,codeboutique) {
    
  if (this.item_id == 0) {
    alert('Erreur Qr code');
    // this.closeCamera();
     //this.scanCode();
   }else{
    let body = {
      aksi: 'addtr',
      //comment : this.comment,
      item_id : item_id,
      descriptions:this.details,
     // sale_status : '1',
     codeboutique:codeboutique,
      codeacces:this.codeacces,
      quantity:this.quantity,
       poids:poids,
      item_location:this.item_location,
      prix_vente_g:0,
     
    };
    this.postPvdr.postData(body, 'file_aksi.php').subscribe( async data => {
      var alertpesan = data.msg;
      if (data.success) {
        this.retouranull();
        
      } else {
      
        const toast = await this.toastController.create({
          message: 'Erreur Ce bijoux est deja Scanner ',
          duration: 2000
        });
        toast.present();
       
      }
      
    });
  
}
}


async createdProsesTR2(item_id,poids,codeboutique,quantity,name) {
    
  if (this.item_id == 0) {
    alert('Erreur Qr code');
    // this.closeCamera();
     //this.scanCode();
   }else{
    let body = {
      aksi: 'addtr2',
      //comment : this.comment,
      item_id : item_id,
      descriptions:this.details,
     // sale_status : '1',
     codeboutique:codeboutique,
     name:name,
      codeacces:this.codeacces,
      quantity:quantity,
       poids:poids,
      item_location:this.item_location,
      prix_vente_g:0,
     
    };
    this.postPvdr.postData(body, 'file_aksi.php').subscribe( async data => {
      var alertpesan = data.msg;
      if (data.success) {
        this.retouranull();
        
      } else {
      
        const toast = await this.toastController.create({
          message: 'Erreur Ce bijoux est deja Scanner ',
          duration: 2000
        });
        toast.present();
       
      }
      
    });
  
}
}

async createdProsesTR3(item_id,poids,codeboutique,quantity,name) {
    
  if (this.item_id == 0) {
    alert('Erreur Qr code');
    // this.closeCamera();
     //this.scanCode();
   }else{
    let body = {
      aksi: 'addtr3',
      //comment : this.comment,
      item_id : item_id,
      descriptions:this.details,
     // sale_status : '1',
     codeboutique:codeboutique,
     name:name,
      codeacces:this.codeacces,
      quantity:quantity,
       poids:poids,
      item_location:this.item_location,
      prix_vente_g:0,
     
    };
    this.postPvdr.postData(body, 'file_aksi.php').subscribe( async data => {
      var alertpesan = data.msg;
      if (data.success) {
        this.retouranull();
        
      } else {
      
        const toast = await this.toastController.create({
          message: 'Erreur Ce bijoux est deja Scanner ',
          duration: 2000
        });
        toast.present();
       
      }
      
    });
  
}
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
          x.style.backgroundColor = 'red';
          x.style.fontSize = 'bold';
         // x.innerHTML = '<ion-icon style="color: #fff;"  name="wifi" slot="start"></ion-icon>'
          //+''+' Connexion  trop lente !';
         // x.style.color = '#fff';
        
      }else if(millisecond > 3000){
          x.style.backgroundColor = 'orange';
          x.style.fontSize = 'bold';
         // x.innerHTML = '<ion-icon style="color: #fff;"  name="wifi" slot="start"></ion-icon>'
          //+''+' Connexion  faible !';
         // x.style.color = '#000';
         
      }else{
          x.style.backgroundColor = 'green';
          x.style.display='none';
         // x.style.color = '#fff';
          x.style.height='15px';
        //  x.innerHTML = '<ion-icon style="color: #fff;"  name="wifi" slot="start"></ion-icon>'
         // +''+'! Conexion stable';
          
         
      }
  }


}

}
