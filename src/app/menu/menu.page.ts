import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { async } from 'q';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Storage } from '@ionic/storage';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  scannedData: any;
  encodedData: '';
  totalsolde:any;
  person_id:any;
  type_operation:string='';
  encodeData: any;
  inputData: any;
  qrData = null;
  createdCode = null;
  scannedCode = null;
  comment: any = '';
  customers: any = [];
  limit: number = 10;
  start: number = 0;
  //sale_status: string = '';
  phone: string='' ;
  nom_client:string ='';
  value :string='';
  quantity: number = 0;
  prix_vente_g:number;
  poids: number = 0;
  item_location: number ;
 
  sale_id: number;
  codeacces: any;
  name:String ='';
  anggota: any;
  public showCamera = false;
  public textScanned: any = '';
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
    public network:Network,
      public dialog:Dialogs,
      private barcodeScanner: BarcodeScanner,
      
     
    ) { 

     // this.scanCode();
    //this.scanBarcode();
      
    }
    scanBarcode() {
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
        this.phone=this.scannedData;
        
         // this.verif();
          this.qrcodeexist();
      }).catch(err => {
        console.log('Error', err);
      });
    }
  
  
    ionViewWillEnter() {
     
      this.storage.get('session_storage').then((res) => {
        this.anggota = res;
        this.codeacces = this.anggota.codeacces;
        this.item_location = this.anggota.item_location;
      });
    }

  ngOnInit() {
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

  turnOffTorch(){
    this.isFlashlight = true;
    this.torchLight.switchOff();
  }
  addCustomer() {
    this.router.navigate(['/scanbijoux']);
  }
  retour(){
    this.router.navigate(['/customer']);
  }
  verifCode(){
    return new Promise(resolve => {
      let body = {
        aksi: 'getqrcodeclient',
        //limit : this.limit,
        //start : this.start,
        phone : this.phone,
        //item_location:this.item_location,
      };

      this.postPvdr.postData(body, 'file_aksi.php').subscribe(data => {
        for (let customer of data.result) {
          this.customers.push(customer);
          this.nom_client = customer.nom_client;
          this.value = customer.value;
          //this.nbre =0;
          this.totalsolde =customer.totalsolde;
         // this.item_location=customer.item_location;

        }
        resolve(true);
      });
    });
  }
  testconnecion(){
    this.network.onDisconnect().subscribe(()=>{
    
      setTimeout(()=>{
        this.dialog.alert('Attention !!! vous navez plus de connexion Internet Verifier Votre Wifi ou Donne Mobile');
              },3000);
  
    });
  }
  scanCode() {
    this.showCamera = true;
    // Optionally request the permission early
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // start scanning
       // console.log('Scan en cours...' + JSON.stringify(status));
       
        let scanSub = this.qrScanner.scan().subscribe((text: String) => {
        //  console.log('Scanned something', text.result);
       
          this.textScanned = text;
          this.phone=this.textScanned;
        
         // this.verif();
          this.qrcodeexist();
         
         //this.createdProses();
          //this.comment=this.textScanned;
      //this.sale_status='1';
      
          //this.qrScanner.hide(); // hide camera preview
          //this.closeCamera();
          //this.addCustomer();
          
           
          
          
          
         
       
          scanSub.unsubscribe(); // stop scanning
          
          this.showCamera = false;
        
        });
      } else if (status.denied) {
        // camera permission was permanently denied
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
    .catch((e: any) => console.log('Error is', e));
  }

  closeCamera() {
    this.showCamera = false;
    this.qrScanner.hide(); // hide camera preview
    this.qrScanner.destroy();
    this.turnOffTorch();
    this.retour();
    
  }
  async qrcodeexist() {
    this.verifCode();
    if (this.nom_client == '') {
      this.showAlert();
    
      //alert('inconu');
    }
   
  }

  async showAlert() {
    await this.alertCtrl.create({
header:"Voulez vous effectuer une operation de depot ou retrait ",

buttons:[
{text:'Confirmer',handler:(res)=>{
  this.verifCode();
  if(this.nom_client==''){
    this.playaudiofalse();
    alert('Erreur Ce compte depot n\'est pas  reconnu dans le system');
    this.closeCamera();
  }else{
    //this.playaudio();
    //this.createdProses();
  }
  

}

},{
text:"Annuler",handler:(res)=>{
  this.closeCamera();

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
  async createdDepot() {
    if (this.comment == '') {
      const toast = await this.toastController.create({
        message: 'Veuillez saisir le nom du client.... ',
        duration: 2000
      });
      toast.present();
       //this.closeCamera();
       //this.scanCode();
     }else if(this.phone == ''){
      const toast = await this.toastController.create({
        message: 'Veuillez saisir le telephone du client.... ',
        duration: 2000
      });
      toast.present();
     }else if(this.type_operation=''){
      const toast = await this.toastController.create({
        message: 'Veuillez choisir  le type d\'operation ',
        duration: 2000
      });
      toast.present();
     }else if(this.value=''){
      const toast = await this.toastController.create({
        message: 'Veuillez saisir  le  montant svp',
        duration: 2000
      });
      toast.present();
     }else{
      let body = {
        aksi: 'adddepotdargent',
        comment : this.comment,
        type_operation:this.type_operation,
        //phone_number : this.phone_number,
       // sale_status : '1',
       value :this.value,
        employe_id:44,
        phone: this.phone,
        //quantity:this.quantity,
        
        //value:this.value,
       
      };
      this.postPvdr.postData(body, 'file_aksi.php').subscribe( async data => {
        var alertpesan = data.msg;
        if (data.success) {
          const toast = await this.toastController.create({
            message: 'votre Depot a ete bien envoyé ',
            duration: 2000
          });
          toast.present();
        // this.router.navigate(['/menu']);
          this.closeCamera();
        } else {
          this.playaudiofalse();
          const toast = await this.toastController.create({
            message: 'Erreur sur l\'operation de depot ',
            duration: 2000
          });
          toast.present();
          //this.closeCamera();
          this.router.navigate(['/menu']);
        }
        
      });
    
  }
}

}
