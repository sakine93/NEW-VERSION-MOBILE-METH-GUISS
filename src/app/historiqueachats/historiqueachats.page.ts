import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController,AlertController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/storage';
import { QRCodeModule } from 'angularx-qrcode';
import { Network } from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { MenubijouteriePage } from '../menubijouterie/menubijouterie.page';

@Component({
  selector: 'app-historiqueachats',
  templateUrl: './historiqueachats.page.html',
  styleUrls: ['./historiqueachats.page.scss'],
})
export class HistoriqueachatsPage implements OnInit {
  customerautretotals:any[];
  customers: any = [];
  limit: number = 10;
  start: number = 0;
  username: string;
  anggota: any;
  comment:string;
  codeacces: any;
  phone_number:any;
  item_location:number;
  totalvente:any;
  nbrepiece:any;
  datevente :string='';
  dateventefin:string='';
  nbre:any;
  require:any;
  num_sale:number=0;
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

    this.ionViewWillEnter();
    
    this.network.onDisconnect().subscribe(()=>{
    
      setTimeout(()=>{
        this.dialog.alert('Attention !!! vous navez plus de connexion Internet Verifier Votre Wifi ou Donne Mobile');
              },3000);
  
    });
    this.network.onConnect().subscribe(()=>{
    
    })
  }
  
 

  ngOnInit() {
    this.ionViewWillEnter();
   
  }

  annuler(){
    this.router.navigate(['menubijouterie']);
  }



  
  

 


  ionViewWillEnter() {
    this.customerautretotals=[];
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
        aksi: 'getdataachat',
        limit : this.limit,
        start : this.start,
        datevente : this.datevente,
        dateventefin:this.dateventefin,
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

      let body4 = {
        aksi: 'gettotalachatsautrestotal',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
        datevente : this.datevente,
        dateventefin:this.dateventefin,
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
          this.totalvente =customer.totalvente;
          this.nbrepiece= customer.nbrepiece;
        
         
        }
        resolve(true);
      });
      this.postPvdr.postData(body4, 'file_aksi.php').subscribe(data => {
        for (let customerautretotal of data.result) {
         
          this.customerautretotals.push(customerautretotal);
         
        }
        resolve(true);
      });
    });
  }
  




}
