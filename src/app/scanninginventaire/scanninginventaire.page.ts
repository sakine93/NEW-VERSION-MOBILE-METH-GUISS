import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController,AlertController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/storage';
import { QRCodeModule } from 'angularx-qrcode';
import { Network } from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';

@Component({
  selector: 'app-scanninginventaire',
  templateUrl: './scanninginventaire.page.html',
  styleUrls: ['./scanninginventaire.page.scss'],
})
export class ScanninginventairePage implements OnInit {

  customers: any = [];
  limit: number = 10;
  start: number = 0;
  username: string;
  anggota: any;
  comment:string;
  codeacces: any;
  phone_number:any;
  item_location:number;
  totallus:any;
  totalstock:any;
  totalstocklus:any;
  nbrepiece:any;
  nbre:any;
  require:any;
  num_sale:number=0;
  recording:boolean =false;
  public myAngularxQrCode: string = 'null'; 

  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    public toastController: ToastController,
    private storage: Storage,
    public network:Network,
    public dialog:Dialogs,
    public alertCtrl:AlertController,
    
  ) { 
    //this.ionViewWillEnter();
    this.createQRCode();
    
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

 

  updateCustomer(id,name,item_unit_price,prix_du_g,poids) {
    this.router.navigate(['/updatecustomer/' + id + '/' + name + '/' + item_unit_price+ '/' + prix_du_g+ '/' + poids]);
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
      event.target.complete();
    }, 100);
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
        aksi: 'getdatainventaire',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
       // item_location : this.item_location,
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


    });
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
