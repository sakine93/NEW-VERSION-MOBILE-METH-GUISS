import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PhotoProduitPage } from './photo-produit.page';
import { CustomerPage } from '../customer/customer.page';

const routes: Routes = [
  {
    path: '',
    component: PhotoProduitPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PhotoProduitPage,CustomerPage],
  entryComponents:[PhotoProduitPage,CustomerPage]
})
export class PhotoProduitPageModule {}
