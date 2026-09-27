import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController,AlertController, ModalController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/storage';
import { QRCodeModule } from 'angularx-qrcode';
import { Network } from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { FacturebijouxPage } from '../facturebijoux/facturebijoux.page';
import { FaturerecuPage } from '../faturerecu/faturerecu.page';
import { FacturebijouxComponent } from '../facturebijoux/facturebijoux.component';

@Component({
  selector: 'app-historiquerecu',
  templateUrl: './historiquerecu.page.html',
  styleUrls: ['./historiquerecu.page.scss'],
})
export class HistoriquerecuPage implements OnInit {
  reffacture:any;
  customers: any = [];
  limit: number = 10;
  datevente :string='';
  start: number = 0;
  username: string;
  anggota: any;
  comment:string;
  codeacces: any;
  phone_number:any;
  item_location:number;
  totalvente:any;
  nbrepiece:any;
  nbre:any;
  require:any;
  datefinstock:string='';
  daterecustock:string='';
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
    public modalController: ModalController,
    
  ) { 
    this.datevente ='00/00/0000'

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
  
 

  ngOnInit() {
    this.ionViewWillEnter();
    this.datefinstock = new Date().toISOString().substring(0, 10);
    this.daterecustock = new Date().toISOString().substring(0, 10);
   
  }

  async facture(reffacture) {
    const modale = await this.modalController.create({
      component: FacturebijouxPage,
      cssClass: 'my-custom-class',
      componentProps: {
        reffacture:reffacture,
       
       
      },
   
    });
    return await modale.present();
  }


  validateStock(reffacture){
alert(reffacture);
this.createdProses(reffacture);
  }
  

  async createdProses(reffacture) {
    if(this.comment==''){
     const toast = await this.toastController.create({
       message: 'Les infos du clients st obligatoires',
       duration: 2000
     });
   }
  
    else {
     let body = {
       aksi: 'updatefacture',
       comment : this.comment,
       reffacture:reffacture,
    
      // sale_status : '1',
       codeacces:this.codeacces,
       item_location : this.item_location,
      
      
     };
     this.postPvdr.postData(body, 'file_aksi.php').subscribe( async data => {
       var alertpesan = data.msg;
       if (data.success) {
         
         const toast = await this.toastController.create({
           message: 'facture bien validé ',
           duration: 2000
         });
         toast.present();
         this.ionViewWillEnter();
       } else {
         const toast = await this.toastController.create({
           message: alertpesan,
           duration: 2000
         });
       }
     });
   }
 }

 


  ionViewWillEnter() {
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

  menuApp(){
    this.router.navigate(['menubijouterie']);
  }
  goBack(){
    this.router.navigate(['customer']);
  }

  loadCustomer() {
    return new Promise(resolve => {
      let body = {
        aksi: 'gethistoriquestock',
        limit : this.limit,
        start : this.start,
        daterecustock:this.daterecustock,
        datefinstock:this.datefinstock,
        codeacces : this.codeacces,
        datevente : this.datevente,
        item_location : this.item_location,
      };

      let body2 = {
        aksi: 'gettotal',
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
        for (let customer of data.result) {
          this.nbre =0;
          this.totalvente =customer.totalvente;
          this.nbrepiece= customer.nbrepiece;
        
         
        }
        resolve(true);
      });
    });
  }


  



}
