import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ScanbijouxtransfertPage } from './scanbijouxtransfert.page';

const routes: Routes = [
  {
    path: '',
    component: ScanbijouxtransfertPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ScanbijouxtransfertPage]
})
export class ScanbijouxtransfertPageModule {}
