import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TransfertPage } from './transfert.page';
import { QRCodeModule } from 'angularx-qrcode';
const routes: Routes = [
  {
    path: '',
    component: TransfertPage
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
  declarations: [TransfertPage]
})
export class TransfertPageModule {}
