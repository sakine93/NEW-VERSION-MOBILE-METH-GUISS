import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Storage } from '@ionic/storage';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
@Component({
  selector: 'app-scanachats',
  templateUrl: './scanachats.page.html',
  styleUrls: ['./scanachats.page.scss'],
})
export class ScanachatsPage implements OnInit {
  titres: any[] = [];
loadingTitres: boolean = false;
  scannedData: any;
  encodedData: '';
  encodeData: any;
  inputData: any;
  comment: any = '';
  achats: any = [];
  limit: number = 10;
  start: number = 0;
  //sale_status: string = '';
  item_id: string = '';
  //titre:string='';
  quantity: number = 0;
  poids: number = 0;
  item_location: any = '';
 
  sale_id: number;
  codeacces: any;
  username:string='';
  name:String ='';
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

         // this.scanCode();
     //this.scanBarcode();
      
    }
  
    ionViewWillEnter() {
     
      this.storage.get('session_storage').then((res) => {
        this.anggota = res;
        this.codeacces = this.anggota.codeacces;
        this.username = this.anggota.username;
      });
    }

  ngOnInit() {
    this.loadTitres();
  }


  loadTitres() {
    this.loadingTitres = true;
    const body = { aksi: 'getalltitre' };
  
    this.postPvdr.postData(body, 'file_aksi.php').subscribe(
      (data: any) => {
        if (data && data.success && Array.isArray(data.result)) {
          this.titres = data.result; // [{id_titre, nom_titre}, ...]
        } else {
          this.titres = [];
        }
        this.loadingTitres = false;
      },
      (_err) => {
        this.titres = [];
        this.loadingTitres = false;
        this.toastController.create({
          message: 'Erreur de chargement des titres',
          duration: 2000
        }).then(t => t.present());
      }
    );
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
    this.router.navigate(['/scanachats']);
  }
  retourachat(){
    this.router.navigate(['/achats']);
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
    //  this.item_id=this.scannedData;
      this.titre = this.scannedData;
      
       // this.verif();
        this.qrcodeexist();
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
          this.qrcodeexist();
         
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
  async qrcodeexist() {

    if (this.poids == 0) {
      this.showAlert();
    

    }
   
  }

  async showAlert() {
    await this.alertCtrl.create({
header:"Un Titre detecté en achat ",

buttons:[
{text:'Confirmer',handler:(res)=>{
  //this.verifCode();
  
  this.createdProsesachats();
this.closeCameraachat();
}

},{
text:"Annuler",handler:(res)=>{
  this.closeCameraachat();

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
    
      let body = {
        aksi: 'addachats',
        //comment : this.comment,
        titre : this.titre,
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
          this.router.navigate(['/achats']);
         
          
        } else {
          this.playaudiofalse();
          const toast = await this.toastController.create({
            message: 'Erreur Ce titre est deja Scanner ',
            duration: 2000
          });
          toast.present();
          this.closeCameraachat();
        }
        
      });
    
  
}

}