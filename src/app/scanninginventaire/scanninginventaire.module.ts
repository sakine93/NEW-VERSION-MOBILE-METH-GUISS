import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { CustomerPage } from '../customer/customer.page';

import { ScanninginventairePage } from './scanninginventaire.page';

const routes: Routes = [
  {
    path: '',
    component: ScanninginventairePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ScanninginventairePage]
})
export class ScanninginventairePageModule {}
