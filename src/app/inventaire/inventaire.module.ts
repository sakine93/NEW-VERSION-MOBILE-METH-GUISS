import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InventairePage } from './inventaire.page';
import { QRCodeModule } from 'angularx-qrcode';
import { CustomerPage } from '../customer/customer.page';
import { UpdateitemPage } from '../updateitem/updateitem.page';
import { FaturerecuPage } from '../faturerecu/faturerecu.page';
import { FacturebijouxComponent } from '../facturebijoux/facturebijoux.component';
import { FacturebijouxPage } from '../facturebijoux/facturebijoux.page';
const routes: Routes = [
  {
    path: '',
    component: InventairePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeModule,
    RouterModule.forChild(routes)
  ],

  declarations: [InventairePage,FaturerecuPage,FacturebijouxComponent,FacturebijouxPage,CustomerPage],
  entryComponents:[InventairePage,FaturerecuPage,FacturebijouxComponent,FacturebijouxPage,CustomerPage]

})
export class InventairePageModule {}
