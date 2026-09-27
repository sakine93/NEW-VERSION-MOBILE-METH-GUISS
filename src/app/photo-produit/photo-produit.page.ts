import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-photo-produit',
  templateUrl: './photo-produit.page.html',
  styleUrls: ['./photo-produit.page.scss'],
})
export class PhotoProduitPage implements OnInit {

  constructor(
    private router: Router,private modalCtrl :ModalController,
 
  
  ) { }

  ngOnInit() {
  }

  retouranull(){
    this.modalCtrl.dismiss();
  }


}
