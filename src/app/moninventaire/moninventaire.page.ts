import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { async } from 'q';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Storage } from '@ionic/storage';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { QRCodeModule } from 'angularx-qrcode';
import { CustomerPage } from '../customer/customer.page';
import {Injectable, Pipe, PipeTransform} from '@angular/core';
import { UpdateitemPage } from '../updateitem/updateitem.page';
import { BijouxmanquantsPage } from '../bijouxmanquants/bijouxmanquants.page';

@Component({
  selector: 'app-moninventaire',
  templateUrl: './moninventaire.page.html',
  styleUrls: ['./moninventaire.page.scss'],
})
export class MoninventairePage implements OnInit {
term='';
  scannedData: any;
  backupUpUsers: any = [];
  encodedData: '';
  encodeData: any;
  inputData: any;
  qrData = null;
  createdCode = null;
  scannedCode = null;
  comment: any = '';
  totalstockpoids:any;
  totalstockpiece:any;
  customers: any = [];
  limit: number = 10;
  start: number = 0;
  //sale_status: string = '';
  item_id: string = '';
  quantity: number = 0;
  prix_vente_g:number;
  poids: number = 0;
  item_location: number ;
 
  sale_id: number;
  codeacces: any;
  name:String ='';
  anggota: any;
  pet:any;
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
      public loadingController: LoadingController,
      private modalCtrl :ModalController,
      
     
    ) { 
this.pet='caisse';
     // this.scanCode();
    //this.scanBarcode();
      
    }
scanner(){
  this.router.navigate(['/scaninventaire']);
}
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


  async facture(category) {
    const modale = await this.modalCtrl.create({
      component: BijouxmanquantsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        category:category,
       
       
      },
   
    });
    return await modale.present();
  }
  
    scanBarcode() {
      const selectedSegment = 'scanner'; // Remplacez cela par votre logique pour obtenir la valeur du segment sélectionné
      
      if (selectedSegment === 'scanner') {
        const startScan = confirm('Voulez-vous démarrer le scan ?');
        
        if (startScan) {
          const options: BarcodeScannerOptions = {
            preferFrontCamera: false,
            showFlipCameraButton: true,
            showTorchButton: true,
            torchOn: false,
            prompt: 'Placez un code-barres à l\'intérieur de la zone de numérisation',
            resultDisplayDuration: 500,
            formats: 'EAN_13,EAN_8,CODE_128,QR_CODE,PDF_417',
            orientation: 'portrait',
          };
      
          this.barcodeScanner.scan(options).then(barcodeData => {
            if (barcodeData.cancelled) {
              console.log("User cancelled the action!");
              this.retour();
              return false;
            }
      
            this.scannedData = barcodeData.text;
            this.item_id = this.scannedData;
      
            this.createdProses();
          }).catch(err => {
            console.log('Error', err);
          });
        } else {
          console.log('Scan cancelled by user.');
        }
      }
    }
    
    
    
  
    ionViewWillEnter() {
      this.customers = [];
      this.loadCustomer();
      this.storage.get('session_storage').then((res) => {
        this.anggota = res;
        this.codeacces = this.anggota.codeacces;
        this.item_location = this.anggota.item_location;
      });
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
      this.loadCustomer().then(() => {
      event.target.complete();
      });
      }, 500);
    }

  ngOnInit() {
   // this.ionViewWillEnter();
  }
  afficherManquants(){

  }

  dismissModal(){
 
    //this.modalCtrl.dismiss();
    this.router.navigate(['/customer']);
    
  }
  
  loadCustomer() {
    return new Promise(resolve => {
      let bodygn = {
        aksi: 'gettotalstockv',
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
      

      

      

      this.postPvdr.postData(bodygn, 'file_aksi.php').subscribe(data => {
        for (let customer of data.result) {
         
          this.customers.push(customer);
         
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
    this.router.navigate(['/moninventaire']);
  }
  verifCode(){
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
          this.item_id=this.textScanned;
        
         // this.verif();
          this.createdProses();
         
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

  async presentLoading() {
   
    this.showAlert();
  }

  async qrcodeexist() {
    this.verifCode();
    if (this.poids == 0) {
      this.showAlert();
      
    

    }
   
  }

  async showAlert() {
    await this.alertCtrl.create({
header:"Validation du bijoux ",

buttons:[
{text:'Valider',handler:(res)=>{

    //this.playaudio();
    this.createdProses();
  
  

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
  async createdProses() {
    if (this.item_id == '') {
      alert('Jai fini le decompte');
       this.closeCamera();
      // this.scanBarcode();
     }else{
      let body = {
        aksi: 'additeminventory',
        //comment : this.comment,
        item_id : this.item_id,
       // sale_status : '1',
        codeacces:this.codeacces,
       // quantity:this.quantity,
         //poids:this.poids,
        //item_location:this.item_location,
        //prix_vente_g:this.prix_vente_g,
       
      };
      this.postPvdr.postData(body, 'file_aksi.php').subscribe( async data => {
        var alertpesan = data.msg;
        if (data.success) {
          this.closeCamera();
       this.scanBarcode();
          //this.router.navigate(['/scaninventaire']);
        } else {
          this.playaudiofalse();
          const toast = await this.toastController.create({
            message: 'Erreur Ce bijoux est deja Scanner ',
            duration: 2000
          });
          toast.present();
          this.closeCamera();
      this.scanBarcode();
        }
        
      });
    
  }
}


}
