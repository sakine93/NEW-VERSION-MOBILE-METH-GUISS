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
import { MiseajourapkPage } from '../miseajourapk/miseajourapk.page';
import { MoninventairePage } from '../moninventaire/moninventaire.page';

@Component({
  selector: 'app-menubijouterie',
  templateUrl: './menubijouterie.page.html',
  styleUrls: ['./menubijouterie.page.scss'],
})
export class MenubijouteriePage implements OnInit {
  username: string;
  anggota: any;
  boutique:string;
  comment:string;
  totalapayer:any;
  codeacces: any;
  phone_number:any;
  item_location:number;
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
    private alertController: AlertController

  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
  
    this.storage.get('session_storage').then((res) => {
      this.anggota = res;
      this.username = this.anggota.username;
      this.codeacces = this.anggota.codeacces;
      this.phone_number = this.anggota.phone_number;
      this.item_location = this.anggota.item_location;
      this.boutique=this.anggota.boutique;
  
    });
  }

  depot(){
    this.router.navigate(['/setting']);
  }

 
  menuApp(){
    this.router.navigate(['customer']);
  }

  menuAchat(){
    //alert('non disponible pour le moment')
    //this.router.navigate(['scaninventaire']);
    this.router.navigate(['updateachatpoids']);
   //alert('Non Disponible pour ce compte');
  }

  historiquevente(){
    this.router.navigate(['historiquevente']);
  }

  miseajour(){
  
  }
  async barcodes() {
    const alert = await this.alertController.create({
      header: 'Code administrateur requis',
      message: 'Veuillez entrer le code administrateur pour accéder à cette page',
      inputs: [
        {
          name: 'code',
          type: 'password',
          placeholder: 'Code administrateur'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Annuler');
          }
        },
        {
          text: 'Valider',
          handler: async (data) => {
            if (data.code === '123489') {
              this.router.navigate(['/barcodes']);
            } else {
              const toast = await this.toastController.create({
                message: 'Code administrateur invalide',
                duration: 2000
              });
              await toast.present();
            }
          }
        }
      ]
    });
  
    await alert.present();
  }
  


  historiqueentre(){
    this.router.navigate(['entrerecu']);
  }
  historiqueachat(){
    //alert('non disponible pour le moment')
    this.router.navigate(['historiqueachats']);
  }

  changepassword(){
    this.router.navigate(['changepassword']);
  }

  async proseslogout() {
    this.storage.clear();
    this.router.navigate(['/login']);
    const toast = await this.toastController.create({
      message: 'Vous etes Deconnecté !',
      duration: 2000
     });
    toast.present();

  }

  rapports(){
    this.router.navigate(['rapportstock']);
  }

  menuVente(){
    this.router.navigate(['/scanbijoux']);
  }

  
  transfertBijoux(){
 //this.router.navigate(['transfert']);
 alert('non dispo');
  }

  async inventaire(){
    const alert = await this.alertController.create({
      header: 'Code administrateur requis',
      message: 'Veuillez entrer le code administrateur pour accéder à cette page',
      inputs: [
        {
          name: 'code',
          type: 'password',
          placeholder: 'Code administrateur'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Annuler');
          }
        },
        {
          text: 'Valider',
          handler: async (data) => {
            if (data.code === '123487') {
              this.router.navigate(['/scaninventaire']);
            } else {
              const toast = await this.toastController.create({
                message: 'Code administrateur invalide',
                duration: 2000
              });
              await toast.present();
            }
          }
        }
      ]
    });
  
    await alert.present();

    }

  
  


}
