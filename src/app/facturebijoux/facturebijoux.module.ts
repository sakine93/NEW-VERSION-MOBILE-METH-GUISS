import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FacturebijouxPage } from './facturebijoux.page';
import { PhotoBijouxPage } from '../photo-bijoux/photo-bijoux.page';
import { PhotoProduitPage } from '../photo-produit/photo-produit.page';


const routes: Routes = [
  {
    path: '',
    component: FacturebijouxPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FacturebijouxPage,FacturebijouxPage,PhotoBijouxPage,PhotoProduitPage],
  entryComponents:[FacturebijouxPage,FacturebijouxPage,PhotoBijouxPage,PhotoProduitPage]
})
export class FacturebijouxPageModule {}
