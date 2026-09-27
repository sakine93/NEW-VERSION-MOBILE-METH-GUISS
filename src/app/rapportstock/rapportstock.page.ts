import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController,AlertController,LoadingController, ModalController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/storage';
import { QRCodeModule } from 'angularx-qrcode';
import { Network } from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { ChoixtitreComponent } from '../choixtitre/choixtitre.component';
import { TitrevendrePage } from '../titrevendre/titrevendre.page';
import { InventairePage } from '../inventaire/inventaire.page';
import { CustomerPage } from '../customer/customer.page';
import { FacturebijouxPage } from '../facturebijoux/facturebijoux.page';

@Component({
  selector: 'app-rapportstock',
  templateUrl: './rapportstock.page.html',
  styleUrls: ['./rapportstock.page.scss'],
})
export class RapportstockPage implements OnInit {

  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    public toastController: ToastController,
    private storage: Storage,
    public network:Network,
    public dialog:Dialogs,
    public alertCtrl:AlertController,
    private barcodeScanner: BarcodeScanner,
    public loadingController: LoadingController,
    public modalController: ModalController,
    public modalCtrl: ModalController,

  ) { 

    this.datevente ='00/00/0000'
    this.dateventefin='00/00/0000'
  }




  menuApp(){
    this.router.navigate(['customer']);
  }

  datevente :string='';
  dateventefin:string='';
  scannedData: any;
  encodedData: '';
  receiving_id:any;
  pet:any;
  encodeData: any;
  inputData: any;
  qrData = null;
  createdCode = null;
  scannedCode = null;
  item_id: string = '';
  customers: any = [];
  limit: number = 10;
  start: number = 0;
  username: string;
  anggota: any;
  boutique:string;
  comment:string;
  totalapayer:any;
  codeacces: any;
  phone_number:any;
  item_location:number;
  totalvente:any;
  totalmessage:any;
  nbrepoidsrecu:any
  nbrepiece:any;
  nbrepoids:any;
  nbre:any;
  require:any;
  num_sale:number=0;
  etat_actuel:string='';
  recording:boolean =false;
  public myAngularxQrCode: string = 'null'; 
  
 
 
  quantity: number = 0;
  prix_vente_g:number;
  poids: number = 0;
  public item_locationss: number ;
 
  public showCamera = false;
  public textScanned: any = '';
  public meseur:any='';
  isFlashlight = false;




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


  //pour le button
  async choixtitre() {
    const modale = await this.modalController.create({
      component: TitrevendrePage,
      cssClass: 'my-custom-class',
    });
    return await modale.present();
  }

  //fin button
  transfert(){
    this.router.navigate(['/transfert']);
  }

  scanBarcode() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 100,
      formats: 'EAN_13,EAN_8,CODE_128,QR_CODE,PDF_417,CODE_39',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then(barcodeData => {
      if (barcodeData.cancelled) {
        alert("Vous avez annuler le scan !");
        this.router.navigate(['/customer']);
      
        return false;
      }
     // this.scannedCode=barcodeData.text;
     
      this.scannedData = barcodeData.text;
      this.item_id=this.scannedData;
      
       // this.verif();
        this.qrcodeexist();
    }).catch(err => {
      console.log('Error', err);
    });
  }
  createQRCode() {
    this.myAngularxQrCode = this.phone_number;
    this.phone_number = "";
  }

  ngOnInit() {
    this.ionViewWillEnter();
  
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
type:'text',name:'comment',placeholder:'Info du client',



},
{
  label:'Avance / Reste',
  value:'S\'il ya avance indiquer le montant',
  disabled:true,
},
{
  label:'Total a payer',
  type:'text',name:'totalapayer',value:0
  
  
  
}

],

buttons:[
{text:'Valider et Envoyer',handler:(res)=>{
  this.comment=res.comment;
  this.totalapayer= res.totalapayer;
  this.createdProses();

}

},{
text:"Annuler"
}
]
    }).then(res =>res.present());
  }

  envoievente(){
    this.showConfirmvente();
  }

  async showConfirmvente() {
    await this.alertCtrl.create({
header:"Etes vous sur de vouloir confirmer cette vente ",

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
      this.boutique=this.anggota.boutique;
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
    this.router.navigate(['/scanbijoux']);
  }

  

  async inventaire(){
    const modale = await this.modalController.create({
      component: InventairePage,
      cssClass: 'my-custom-class',
    });
    return await modale.present();
  }

  achatsor(){
    //alert('test');
    this.router.navigate(['/scanachats']);
  }
  addCustomerb() {
    this.router.navigate(['/addcustomer']);
  }

  depot(){
    this.router.navigate(['/ventepoids']);
  }

  updateCustomer(id,name,item_unit_price,prix_du_g,poids) {
    this.router.navigate(['/updatecustomer/' + id + '/' + name + '/' + item_unit_price+ '/' + prix_du_g+ '/' + poids]);
  }
  updateCustomerpoids(id,name,item_unit_price,prix_du_g) {
    this.router.navigate(['/updatecustomerpoids/' + id + '/' + name + '/' + item_unit_price+ '/' + prix_du_g]);
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
      this.verif();
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
        aksi: 'delete',
        num_sale : id
      };

    this.postPvdr.postData(body, 'file_aksi.php').subscribe(data => {
        this.ionViewWillEnter();
      });
  }

  loadCustomer() {
    return new Promise(resolve => {
      let body = {
        aksi: 'getdata',
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
        aksi: 'gettotalfacturerapport',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
        item_location : this.item_location,
        datevente : this.datevente,
        dateventefin:this.dateventefin,
        item_locationss:this.item_locationss
      };
      

      this.postPvdr.postData(body, 'file_aksi.php').subscribe(data => {
        for (let customer of data.result) {
         
          this.customers.push(customer);
          this.meseur='Aucun bijoux en vente ?';
        
         
        }
        resolve(true);
      });

      this.postPvdr.postData(body2, 'file_aksi.php').subscribe(data => {
        for (let customer of data.result) {
          this.nbre =0;
          this.totalvente = parseFloat(customer.totalvente).toFixed(0);
          this.nbrepiece = customer.nbrepiece;
          this.nbrepoids = customer.nbrepoids;
        
         
        }
        resolve(true);
      });

      this.postPvdr.postData(body3, 'file_aksi.php').subscribe(data => {
        for (let customer of data.result) {
          this.nbre =0;
          this.totalmessage = parseFloat(customer.totalmessage).toFixed(0);
          this.nbrepoidsrecu = parseFloat(customer.nbrepoidsrecu).toFixed(0);
          this.customers.push(customer);
        
         
        }
        resolve(true);
      });

     
    });
  }


  
  scanAchat(){
    this.router.navigate(['/scaninventaire']);
  }


  VoirFacture(receiving_id) {
    this.router.navigate(['/facturebijoux/' + receiving_id]);
  }



  inventairer(){
    this.router.navigate(['/scanninginventaire']);
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
        aksi: 'envoiecaisse',
        comment : this.comment,
        totalapayer:this.totalapayer,
     
       // sale_status : '1',
        codeacces:this.codeacces,
        item_location : this.item_location,
       
       
      };
      this.postPvdr.postData(body, 'file_aksi.php').subscribe( async data => {
        var alertpesan = data.msg;
        if (data.success) {
          
          const toast = await this.toastController.create({
            message: 'Les ventes ont été bien envoyé a la caisse ',
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


  async qrcodeexist() {
    this.verifCode();
    if (this.poids == 0) {
      this.presentLoading();
      
    

    }
   
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
        item_id : this.item_id,
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
          x.style.color = 'red';
          x.style.fontSize = 'bold';
         // x.innerHTML = '<ion-icon style="color: #fff;"  name="wifi" slot="start"></ion-icon>'
          //+''+' Connexion  trop lente !';
         // x.style.color = '#fff';
        
      }else if(millisecond > 3000){
          x.style.color = 'orange';
          x.style.fontSize = 'bold';
         // x.innerHTML = '<ion-icon style="color: #fff;"  name="wifi" slot="start"></ion-icon>'
          //+''+' Connexion  faible !';
         // x.style.color = '#000';
         
      }else{
          x.style.color = 'green';
         // x.style.color = '#fff';
       //   x.style.height='15px';
        //  x.innerHTML = '<ion-icon style="color: #fff;"  name="wifi" slot="start"></ion-icon>'
         // +''+'! Conexion stable';
          
         
      }
  }
 }

}
