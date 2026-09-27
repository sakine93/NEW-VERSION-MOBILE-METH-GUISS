import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 username: string = '';
 username2: string = '';
 password: string = '';

  constructor(
    private router: Router,
    public toastController: ToastController,
    private postPvdr: PostProvider,
    private storage: Storage,
    ) { }

  ngOnInit() {

  }

  vieux(){
    this.username='vieux';
    this.username2='Compte Vieux';
  }
  ibou(){
    this.username='ibrahima';
    this.username2='Compte Ibrahima';
  }
  fatou(){
    this.username='fatou';
    this.username2='Compte ND Fatou';
  }
  admin(){
    this.username='admin';
    this.username2='Compte Admin';
  }

  formRegister() {
    this.router.navigate(['/register']);
  }

  async proseslogin() {
    if (this.username != '' && this.password != '') {
      let body = {
        username: this.username,
        password: this.password,
        aksi: 'login'
      };
      this.postPvdr.postData(body, 'file_aksi.php').subscribe(async data => {
       var alertpesan = data.msg;
       if (data.success) {
         this.storage.set('session_storage', data.result);
         this.router.navigate(['/customer']);
         const toast = await this.toastController.create({
          message: 'Welcome!',
          duration: 2000
         });
         toast.present();
       } else {
         const toast = await this.toastController.create({
           message: alertpesan,
           duration: 2000
         });
         toast.present();
       }
     });

    } else {
      const toast = await this.toastController.create({
        message: 'Erreur de conexion verifier a nouveau',
        duration: 2000
      });
      toast.present();
      this.clear();
    }

    this.username = '';
    this.password = '';

    }


    
    addNumber(num: number) {
     
      if (this.password.length < 6) {
       
        this.password += num;
        this.updateDots();
      }else if (this.password.length === 6) {
       
       // this.proseslogin();
      }
    }
    clear() {
      this.password = '';
      this.updateDots();
  
    }

  updateDots() {
    const dots = document.querySelectorAll('.password-dot');
    for (let i = 0; i < 6; i++) {
      if (i < this.password.length) {
        dots[i].classList.add('dot-active');
      } else {
        dots[i].classList.remove('dot-active');
      }
    }
  }
  }
