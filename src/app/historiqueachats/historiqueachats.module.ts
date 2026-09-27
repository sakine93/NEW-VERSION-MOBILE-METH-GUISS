import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HistoriqueachatsPage } from './historiqueachats.page';

const routes: Routes = [
  {
    path: '',
    component: HistoriqueachatsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HistoriqueachatsPage]
})
export class HistoriqueachatsPageModule {}
