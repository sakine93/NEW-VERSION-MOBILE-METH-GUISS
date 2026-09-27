import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CustomerPage } from './customer.page';
import { QRCodeModule } from 'angularx-qrcode';
import { ChoixtitreComponent } from '../choixtitre/choixtitre.component';
import { TitrevendrePage } from '../titrevendre/titrevendre.page';
import { InventairePage } from '../inventaire/inventaire.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PhotoProduitPage } from '../photo-produit/photo-produit.page';
import { ModalchoixComponent } from '../modalchoix/modalchoix.component';
const routes: Routes = [
  {
    path: '',
    component: CustomerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CustomerPage,ChoixtitreComponent,TitrevendrePage,PhotoProduitPage,ModalchoixComponent,InventairePage],
  entryComponents:[CustomerPage,ChoixtitreComponent,TitrevendrePage,PhotoProduitPage,ModalchoixComponent,InventairePage]

})
export class CustomerPageModule {}
