import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-achats',
  templateUrl: './achats.page.html',
  styleUrls: ['./achats.page.scss'],
})
export class AchatsPage implements OnInit {

  achats: any[] = [];
  titres: any[] = [];
  totalachats = 0;
  username = '';
  codeacces = '';
  clientName = '';

  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.storage.get('session_storage').then(res => {
      if (res) {
        this.username = res.username;
        this.codeacces = res.codeacces;
  
        // 🔥 ICI SEULEMENT
        this.loadAchats();
      }
    });
  }

  loadSession() {
    this.storage.get('session_storage').then(res => {
      if (res) {
        this.username = res.username;
        this.codeacces = res.codeacces;
      }
    });
  }

  loadAchats() {
    this.postPvdr.postData(
      { aksi: 'getachats', codeacces: this.codeacces },
      'file_aksi.php'
    ).subscribe(data => {
      this.achats = data.result ? data.result : [];
    });

    this.postPvdr.postData(
      { aksi: 'gettotalachats', codeacces: this.codeacces },
      'file_aksi.php'
    ).subscribe(data => {
      if (data.result && data.result.length > 0) {
        this.totalachats = data.result[0].totalachats;
      } else {
        this.totalachats = 0;
      }
    });
  }

  addCustomer() {
    this.router.navigate(['/scanachats']);
  }

  updateAchat(id, titre) {
    this.router.navigate(['/updateachat/' + id + '/' + titre]);
  }

  delCustomers(id) {
    this.postPvdr.postData(
      { aksi: 'deleteachats', achat_id: id },
      'file_aksi.php'
    ).subscribe(() => {
      this.loadAchats();
    });
  }

  async showClient() {
    const alert = await this.alertCtrl.create({
      header: 'Client',
      inputs: [{ name: 'client', type: 'text', placeholder: 'Nom et téléphone' }],
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        {
          text: 'Valider',
          handler: data => {
            if (data.client) this.clientName = data.client;
          }
        }
      ]
    });
    await alert.present();
  }

  async createdProses() {

    if (!this.clientName) {
      const toast = await this.toastCtrl.create({
        message: 'Veuillez renseigner le client',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      return;
    }
  
    const body = {
      aksi: 'envoiecaisseachats',
      comment: this.clientName,
      codeacces: this.codeacces
    };
  
    this.postPvdr.postData(body, 'file_aksi.php')
      .subscribe({
        next: async res => {
          if (res.success) {
            const toast = await this.toastCtrl.create({
              message: '✅ Achats envoyés à la caisse',
              duration: 2000,
              color: 'success'
            });
            toast.present();
  
            this.clientName = '';
            this.achats = [];
            this.totalachats = 0;
  
            this.loadAchats();
          } else {
            const toast = await this.toastCtrl.create({
              message: res.msg || 'Erreur côté serveur',
              duration: 2000,
              color: 'danger'
            });
            toast.present();
          }
        },
        error: async err => {
          console.error('API ERROR', err);
          const toast = await this.toastCtrl.create({
            message: '❌ API indisponible',
            duration: 2000,
            color: 'danger'
          });
          toast.present();
        }
      });
  }

  acceuil() {
    this.router.navigate(['/customer']);
  }

  proseslogout() {
    this.router.navigate(['/customer']);
  }
}