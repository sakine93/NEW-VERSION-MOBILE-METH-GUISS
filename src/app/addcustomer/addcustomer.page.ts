import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { async } from 'q';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.page.html',
  styleUrls: ['./addcustomer.page.scss'],
})
export class AddcustomerPage implements OnInit {

  name: string = '';
  category: string = '';
  id: number;
  item_unit_price :any;
  public showCamera = false;
  public textScanned: any = '';
  constructor(
    private postPvdr: PostProvider,
    private router: Router,
    public toastController: ToastController,
    private actRoute: ActivatedRoute,
    private qrScanner: QRScanner
  ) {
    this.scanCode();
   }

  ngOnInit() {
   
  }

  async createdProses() {
    if (this.name == '') {
      const toast = await this.toastController.create({
        message: 'Customer name is required',
        duration: 2000
      });
      toast.present();
    } else if (this.category == '') {
      const toast = await this.toastController.create({
        message: 'Decsription is required',
        duration: 2000
        });
      toast.present();
    }else if (this.item_unit_price == '') {
      const toast = await this.toastController.create({
        message: 'Decsription is required',
        duration: 2000
        });
      toast.present();
    }
     else {
      let body = {
        aksi: 'add',
        name : this.name,
        category : this.category
      };
      this.postPvdr.postData(body, 'file_aksi.php').subscribe( async data => {
        var alertpesan = data.msg;
        if (data.success) {
          this.router.navigate(['/customer']);
          const toast = await this.toastController.create({
            message: 'Data inserted successful',
            duration: 2000
          });
          toast.present();
        } else {
          const toast = await this.toastController.create({
            message: alertpesan,
            duration: 2000
          });
        }
      });
    }
  }

  async updateProses() {
    if (this.name == ''){
      const toast = await this.toastController.create({
        message: 'Aucune Reference Trouve',
        duration: 2000
      });
      toast.present();
    } else if (this.category == ''){
      const toast = await this.toastController.create({
        message: 'Aucune category trouve',
        duration: 2000
      });
      toast.present();
    }else if (this.item_unit_price == ''){
      const toast = await this.toastController.create({
        message: 'Veuillez Rensigner le prix de vente',
        duration: 2000
      });
      toast.present();
    } else {
      let body = {
        aksi: 'update',
        sale_id : this.id,
        name : this.name,
        category : this.category,
        item_unit_price:this.item_unit_price
      };
      this.postPvdr.postData(body, 'file_aksi.php').subscribe( async data => {
        var alertpesan = data.msg;
        if (data.success) {
          this.router.navigate(['/customer']);
          const toast =await this.toastController.create({
            message: 'Prix Mis a Jour ',
            duration: 2000
          });
          toast.present();
        } else {
          const toast =await this.toastController.create({
            message: alertpesan,
            duration: 2000
          });
        }
      });


    }
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
          console.log('Scanned something', text);
          this.textScanned = text;
          this.qrScanner.hide(); // hide camera preview
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
  }
}
