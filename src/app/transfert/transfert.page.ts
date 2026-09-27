import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { async } from 'q';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Storage } from '@ionic/storage';
import { QRCodeModule } from 'angularx-qrcode';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-transfert',
  templateUrl: './transfert.page.html',
  styleUrls: ['./transfert.page.scss'],
})
export class TransfertPage implements OnInit {
  customers: any = [];
  scannedData: any;
  encodedData: '';
  encodeData: any;
  inputData: any;
  comment: any = '';
  achats: any = [];
  limit: number = 10;
  start: number = 0;
  quantity: number = 0;
  prix_vente_g:number;
  poids: number = 0;
  stockname:string='';
  location_id:number=0;
  //sale_status: string = '';
  item_id: string = '';
  //titre:string='';
  item_location: any = '';
  totalstockpoids:any;
  totalstockpiece:any;
  lieu_transfert:any;
  item_locationss:any;
  comptetransfert:any;
  phone_number:any;
  totalvente:any;
  nbrepiece:any;
  nbre:any;
  sale_id: number;
  codeacces: any;
  username:string='';
  boutique:string='';
  name:String ='';
  anggota: any;
  public showCamera = false;
  public titre: any = '';
  isFlashlight = false;
  public myAngularxQrCode: string = 'null'; 
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
    private alertController:AlertController,
    public loadingController: LoadingController
    ) { 

         // this.scanCode();
     //this.scanbijouxinv();
      
    }
  
    ionViewWillEnter() {
     // this.createQRCode();
      this.customers = [];
      this.start = 0;
      this.loadCustomer();
      this.storage.get('session_storage').then((res) => {
        this.anggota = res;
        this.codeacces = this.anggota.codeacces;
        this.boutique = this.anggota.boutique;
        this.username = this.anggota.username;
        this.phone_number = this.anggota.phone_number;
        this.item_location = this.anggota.item_location;
        this.nbre= 0;
      });
    }
    createQRCode() {
      this.myAngularxQrCode = this.phone_number;
      this.phone_number = this.myAngularxQrCode;
    }

  loadCustomer() {
    return new Promise(resolve => {
      let body = {
        aksi: 'getlisttransfert',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
        item_location : this.item_location,
      };

      let body2 = {
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
        for (let customerp of data.result) {
         
         // this.customersbarcodes.push(customerp);
          //this.verif();
          this.totalstockpoids = parseFloat(customerp.totalstockpoids).toFixed(2);
          this.totalstockpiece = parseFloat(customerp.totalstockpiece).toFixed(0);
        }
        resolve(true);
        
      });
    });
  }

  

  ngOnInit() {
   // this.scanCode();
   //this.ionViewWillEnter();
  }


  getValue(){
    console.log(this.item_locationss);
    if(this.item_locationss==34){
      this.comptetransfert='Serigne Mbacke Seck';
    }
    if(this.item_locationss ==35){
      this.comptetransfert='Pape Seye';
    }
     if(this.item_locationss==36){
      this.comptetransfert='Alladji Salla Niang';
    }
    if(this.item_locationss ==37){
      this.comptetransfert='Dame Diallo';
    }
     if(this.item_locationss==38){
      this.comptetransfert='Bekery Niass';
    }
    if(this.item_locationss ==39){
      this.comptetransfert='Issa Thiam';
    }
     if(this.item_locationss==40){
      this.comptetransfert='Ahmeth Sy';
    }
    if(this.item_locationss ==41){
      this.comptetransfert='Pape lo';
    }
     if(this.item_locationss==42){
      this.comptetransfert='Mamadou Niang';
    }
    if(this.item_locationss ==43){
      this.comptetransfert='Khadim Gueye';
    } if(this.item_locationss==44){
      this.comptetransfert='Talla Seck';
    }

    

    //this.lieu_transfert.val(this.item_locationss);
    // the value will be displayed
    }

    
  playaudio(){
    this.nativeAudio.preloadComplex('right', 'assets/son.wav',3,1,1);
  this.nativeAudio.play('right');
  }
  playaudiofalse(){
    this.nativeAudio.preloadComplex('right', 'assets/false.wav',3,1,1);
  this.nativeAudio.play('right');
  }
  turnOnTorch(){
    if(this.torchLight.available()){
      this.isFlashlight = false;
      this.torchLight.switchOn();
    }else{
      alert("Flashlight doesn't exist");
    }
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }

  turnOffTorch(){
    this.isFlashlight = true;
    this.torchLight.switchOff();
  }
  addCustomer() {
    this.router.navigate(['/scanachats']);
  }
  retourachat(){
    this.router.navigate(['/transfert']);
  }

  acceuil(){
    this.router.navigate(['/customer']);
  }
  

  scanbijouxinv() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,CODE_128,QR_CODE,PDF_417',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then(barcodeData => {
     
     // this.scannedCode=barcodeData.text;
     
      this.scannedData = barcodeData.text;
    //  this.item_id=this.scannedData;
      this.item_id = this.scannedData;
      
       // this.verif();
        this.qrcodeexist();
    }).catch(err => {
      console.log('Error', err);
    });
  }

  


  scanBarcode() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 100,
      formats: 'EAN_13,EAN_8,CODE_128,QR_CODE,PDF_417',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then(barcodeData => {
      if (barcodeData.cancelled) {
        console.log("User cancelled the action!");
        this.retourachat();
      
        return false;
      }
     // this.scannedCode=barcodeData.text;
     
      this.scannedData = barcodeData.text;
      this.titre=this.scannedData;
      
       // this.verif();
       this.createdProsesachats();
    }).catch(err => {
      console.log('Error', err);
    });
  }

  scanCode() {
    this.showCamera = true;
    // Optionally request the permission early
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // start scanning
        console.log('Scan en cours...' + JSON.stringify(status));
       
        const scanSub = this.qrScanner.scan().subscribe((text: String) => {
        //  console.log('Scanned something', text.result);
       
          this.titre = text;
         // this.item_id=this.textScanned;
        
         // this.verif();
         this.createdProsesachats();
         
         //this.createdProses();
          //this.comment=this.textScanned;
      //this.sale_status='1';
      
          //this.qrScanner.hide(); // hide camera preview
          //this.closeCamera();
          //this.addCustomer();
          
           
          
          
          
         
       
          scanSub.unsubscribe(); // stop scanning
          this.showCamera = true;
        
        });
      } else if (status.denied) {
        // camera permission was permanently denied
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
    .catch((e: any) => console.log('Error is', e));
  }

  closeCameraachat() {
    this.showCamera = false;
    this.qrScanner.hide(); // hide camera preview
    this.qrScanner.destroy();
    this.turnOffTorch();
    this.retourachat();
  }
  
  async verificationcode() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Nous verifions la reference un instant ...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.showAlert();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Patienter Un Instant svp ...',
      duration: 500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.showAlert();
  }

  async qrcodeexist() {
    this.verifCode();
    if (this.poids == 0) {
      this.presentLoading();
      
    

    }
   
  }

  verifCode(){
    alert('code='+this.item_id);
    return new Promise(resolve => {
      let body = {
        aksi: 'getqrcode',
        //limit : this.limit,
        //start : this.start,
        item_id : this.item_id,
        item_location:this.item_location,
      };

      this.postPvdr.postData(body, 'file_aksi.php').subscribe(data => {
        for (let customer of data.result) {
          this.customers.push(customer);
          this.poids = customer.poids;
          this.quantity=customer.quantity;
          this.prix_vente_g = customer.prix_vente_g;
          this.location_id=customer.location_id;

        }
        resolve(true);
      });
    });
  }

  async showAlert() {
    await this.alertCtrl.create({
header:"",
message:'Un bijoux detecté en vente Voulez vous confimer le scan ?',

buttons:[
{text:'Continuer',handler:(res)=>{
  this.verifCode();
  if(this.poids==0){
    this.playaudiofalse();
    alert('Erreur Ce Bijoux n\'est pas  reconnu dans le system');
    this.retourachat();
  }else if(this.location_id!=this.item_location){
    if(this.location_id==18){
      this.stockname= 'Stock Beukheury';
    }
    if(this.location_id==27){
      this.stockname= 'Saliou Niang';
    }
    if(this.location_id==25){
      this.stockname= 'Dame Diallo';
    }
    if(this.location_id==7){
      this.stockname= 'Stock Boutique';
    }
    if(this.location_id==10){
      this.stockname= 'Stock Adji';
    }
    if(this.location_id==35){
      this.stockname= 'Ahmeth Sy';
    }
    if(this.location_id==28){
      this.stockname= 'Stock Issa';
    }
    if(this.location_id==23){
      this.stockname= 'Stock Mamadou';
    }
    if(this.location_id==26){
      this.stockname= 'Modou Sylla';
    }
    if(this.location_id==8){
      this.stockname= 'Serigne Macke';
    }
    if(this.location_id==24){
      this.stockname= 'Pape Seye';
    }
    alert('Attention !!! Ce bijoux se trouve dans la vitrine '+ this.stockname + ' Vouler vous le vendre sur votre compte ?');
    this.createdProsesachats();
  
  }
  else{
    //this.playaudio();
    this.createdProsesachats();
  }
  

}

},{
text:"Annuler",handler:(res)=>{
  this.retourachat();

}
}
]
    }).then(res =>res.present());
  }

  async verif(){
    const toast = await this.toastController.create({
      message: 'Verification en cours.... ',
      duration: 2000
    });
    toast.present();
  }
  async createdProsesachats() {
    if (this.poids == 0) {
      alert('Erreur Qr code');
       this.retourachat();
       //this.scanCode();
     }else{
      let body = {
        aksi: 'additemslist',
        //comment : this.comment,
        item_id : this.item_id,
        
       // sale_status : '1',
        codeacces:this.codeacces,
        //username:this.username,
       // quantity:this.quantity,
         //poids:this.poids,
        item_location:this.item_location
       
      };
      this.postPvdr.postData(body, 'file_aksi.php').subscribe( async data => {
        var alertpesan = data.msg;
        if (data.success) {
          this.closeCameraachat();
          this.scanBarcode();
         // this.closeCameraachat();
          this.router.navigate(['/transfert']);
         
          
        } else {
          this.playaudiofalse();
          const toast = await this.toastController.create({
            message: 'Erreur Ce code est deja Scanner ',
            duration: 2000
          });
          toast.present();
          this.closeCameraachat();
        }
        
      });
    
    }
}


async ajoutItem() {
  
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    message: '<strong style="font-size:29px">REFERENCE DU BIJOUX</strong>',
    inputs:[
      {
    type:'tel',name:'item_id',
    },
   
     
    ],
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
        cssClass: 'secondary',
      
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Confirmer',
        
        handler: (res) => {
        this.item_id=res.item_id;
        this.qrcodeexist();
        // console.log('qte ='+this.quantite);
         // this.insertProd(name,item_id,unit_price);

         
        }
      }
    ]
  });


  
  await alert.present();
  const firstInput: any = document.querySelector('ion-alert input');
  firstInput.focus();
}



annulertransfert(){
  this.router.navigate(['customer'])
}



}
