import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VentepoidsPage } from './ventepoids.page';

const routes: Routes = [
  {
    path: '',
    component: VentepoidsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VentepoidsPage]
})
export class VentepoidsPageModule {}
