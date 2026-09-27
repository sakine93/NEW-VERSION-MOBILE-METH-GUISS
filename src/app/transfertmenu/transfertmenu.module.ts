import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TransfertmenuPage } from './transfertmenu.page';
import { FacturebijouxComponent } from '../facturebijoux/facturebijoux.component';
import { QRCodeModule } from 'angularx-qrcode';
const routes: Routes = [
  {
    path: '',
    component: TransfertmenuPage
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
  declarations: [TransfertmenuPage,FacturebijouxComponent],
  entryComponents:[TransfertmenuPage,FacturebijouxComponent]
})
export class TransfertmenuPageModule {}
