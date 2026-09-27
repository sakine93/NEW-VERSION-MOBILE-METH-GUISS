import { Component, OnInit,Input } from '@angular/core';
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
import { TransfertmenuPage } from '../transfertmenu/transfertmenu.page';
import { PhotoProduitPage } from '../photo-produit/photo-produit.page';


@Component({
  selector: 'app-modalchoix',
  templateUrl: './modalchoix.component.html',
  styleUrls: ['./modalchoix.component.scss'],
})
export class ModalchoixComponent implements OnInit {

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
  ) { }

  ngOnInit() {
    const modalWrapper = document.querySelector('.modal-wrapper');
    modalWrapper.setAttribute('style', 'width: 100%; height: 50%;background-color:#fcb800');
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async barcode() {
    this.modalController.dismiss();
    this.router.navigate(['/scanbijoux']);
  }

  async poids() {
    this.modalController.dismiss();
    //this.router.navigateByUrl('/poids-page');
    alert('Non dispo');
  }


}
