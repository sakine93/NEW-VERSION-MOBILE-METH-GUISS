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
  selector: 'app-historiquevente',
  templateUrl: './historiquevente.page.html',
  styleUrls: ['./historiquevente.page.scss'],
})
export class HistoriqueventePage implements OnInit {

  customers: any = [];
  customerautres:any=[];
  customerautretotals:any[];
  limit: number = 10;
  datevente :string='';
  dateventefin:string='';
  start: number = 0;
  username: string;
  full_name: string;
  anggota: any;
  comment:string;
  codeacces: any;
  phone_number:any;
  item_location:number;
  totalvente:any;
  nbrepiece:any;
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
    this.datevente ='00/00/0000'
    this.dateventefin='00/00/0000'

    this.ionViewWillEnter();
    
    this.network.onDisconnect().subscribe(()=>{
    
      setTimeout(()=>{
        this.dialog.alert('Attention !!! vous navez plus de connexion Internet Verifier Votre Wifi ou Donne Mobile');
              },3000);
  
    });
    this.network.onConnect().subscribe(()=>{
    
    })
  }
  
  showCustomer(id) {
    this.router.navigate(['/showcustomer/' + id+ '/']);
    sale_id : id
 
  }
  
  annuler(){
    this.router.navigate(['menubijouterie']);
  }
 

  ngOnInit() {
    this.ionViewWillEnter();
   
  }



  
  

 


  ionViewWillEnter() {
    this.customers = [];
    this.customerautres=[];
    this.customerautretotals=[];
    this.start = 0;
    this.loadCustomer();
    this.storage.get('session_storage').then((res) => {
      this.anggota = res;
      this.username = this.anggota.username;
      this.full_name = this.anggota.full_name;
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
        aksi: 'getdatavente',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
        datevente : this.datevente,
        dateventefin:this.dateventefin,
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
        aksi: 'gettotalventeautres',
        limit : this.limit,
        start : this.start,
        codeacces : this.codeacces,
        datevente : this.datevente,
        dateventefin:this.dateventefin,
        item_location : this.item_location,
      };
      let body4 = {
        aksi: 'gettotalventeautrestotal',
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
      this.postPvdr.postData(body3, 'file_aksi.php').subscribe(data => {
        for (let customerautre of data.result) {
         
          this.customerautres.push(customerautre);
         
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
