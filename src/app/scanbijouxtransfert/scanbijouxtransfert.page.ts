import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { async } from 'q';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Storage } from '@ionic/storage';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-scanbijouxtransfert',
  templateUrl: './scanbijouxtransfert.page.html',
  styleUrls: ['./scanbijouxtransfert.page.scss'],
})
export class ScanbijouxtransfertPage implements OnInit {
  scannedData: any;
  encodedData: '';
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

  //sale_status: string = '';

  stockname:string='';
  location_id:number=0;
 
 
  sale_id: number;

  name:String ='';

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
      public loadingController: LoadingController
      
     
    ) { 

     // this.scanCode();
   // this.scanBarcode();
      
    }
    scanBarcode() {
      const options: BarcodeScannerOptions = {
        preferFrontCamera: false,
        showFlipCameraButton: false,
        showTorchButton: true,
        torchOn: false,
        prompt: 'Place a barcode inside the scan area',
        resultDisplayDuration: 10,
        formats: 'EAN_13,EAN_8,CODE_128,QR_CODE,PDF_417',
        orientation: 'portrait',
      };
  
      this.barcodeScanner.scan(options).then(barcodeData => {
        if (barcodeData.cancelled) {
          console.log("User cancelled the action!");
          this.retour();
        
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

    doRefresh(event) {
      setTimeout(() => {
        this.ionViewWillEnter();
        
      //  this.controle();
       // this.verif();
        event.target.complete();
      }, 500);
    }
  
  
    ionViewWillEnter() {
      this.item_id='';
      this.customers = [];
    this.start = 0;
    this.loadCustomer();
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
    this.router.navigate(['/scanbijouxtransfert']);
  }
  verifCode(){
    return new Promise(resolve => {
      let body = {
        aksi: 'getqrcodetransfert',
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


  loadCustomer() {
    return new Promise(resolve => {
      let body = {
        aksi: 'getdatatransfert',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
        item_location : this.item_location,
      };

      let body2 = {
        aksi: 'gettotaltransfert',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
        item_location : this.item_location,
      };
      let body3 = {
        aksi: 'gettotalmessage',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
        item_location : this.item_location,
      };

      this.postPvdr.postData(body, 'file_aksi.php').subscribe(data => {
        for (let customer of data.result) {
         
          this.customers.push(customer);
          this.meseur='Aucun bijoux en transfert ?';
        
         
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
          this.item_id=this.textScanned;
        
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


  async verificationcode() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Nous verifions la reference un instant ...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.showAlert(this.item_id);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Patienter Un Instant svp ...',
      duration: 500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.showAlert(this.item_id);
  }

  async qrcodeexist() {
    this.verifCode();
    this.showAlert(this.item_id);
   
  }

  async showAlert(item_id) {
    await this.alertCtrl.create({
header:"REF"+item_id,
message:'Un bijoux detecté en transfert Voulez vous ajouter ce barcode au transfert ?',

buttons:[
{text:'Continuer',handler:(res)=>{
  this.verifCode();
  if(this.location_id!=this.item_location && this.poids==0){
    this.playaudiofalse();
    alert('Erreur !!! Cette reference nest pas disponible sur votre stock reesayer a nouveau !');
    this.closeCamera();
    this.item_id='';
  }
  else{
    //this.playaudio();
    this.createdProses();
    this.item_id='';
    this.ionViewWillEnter();
  }
  

}

},{
text:"Annuler",handler:(res)=>{
  this.closeCamera();
  this.item_id='';
  this.ionViewWillEnter();

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

  delCustomers(id) {
    let body = {
        aksi: 'deletetransfert',
        num_sale : id
      };

    this.postPvdr.postData(body, 'file_aksi.php').subscribe(data => {
        this.ionViewWillEnter();
      });
  }

  async createdProses() {
    if (this.poids == 0) {
      alert('Erreur Qr code');
       this.closeCamera();
       //this.scanCode();
     }else{
      let body = {
        aksi: 'addtransfert',
        //comment : this.comment,
        item_id : this.item_id,
       // sale_status : '1',
        codeacces:this.codeacces,
        quantity:this.quantity,
         poids:this.poids,
        item_location:this.item_location,
        prix_vente_g:this.prix_vente_g,
       
      };
      this.postPvdr.postData(body, 'file_aksi.php').subscribe( async data => {
        var alertpesan = data.msg;
        if (data.success) {
          const toast = await this.toastController.create({
            message: 'Le bijoux a été bien ajouté ',
            duration: 500
            
          });

          toast.present();
          this.ionViewWillEnter();
          
        } else {
          this.playaudiofalse();
          const toast = await this.toastController.create({
            message: 'Erreur Ce bijoux est deja Scanner ',
            duration: 2000
          });
          toast.present();
          this.closeCamera();
        }
        
      });
    
  }
}

}
