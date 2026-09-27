import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BijouxmanquantsPage } from './bijouxmanquants.page';
import { PhotoBijouxPage } from '../photo-bijoux/photo-bijoux.page';
import { PhotoProduitPage } from '../photo-produit/photo-produit.page';
import { MoninventairePage } from '../moninventaire/moninventaire.page';
import { ImagemodalPage } from '../imagemodal/imagemodal.page';

const routes: Routes = [
  {
    path: '',
    component: BijouxmanquantsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],

  declarations: [BijouxmanquantsPage,PhotoBijouxPage,MoninventairePage,ImagemodalPage],
  entryComponents:[BijouxmanquantsPage,PhotoBijouxPage,MoninventairePage,ImagemodalPage]
})
export class BijouxmanquantsPageModule {}
