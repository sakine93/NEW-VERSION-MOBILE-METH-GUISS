import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MoninventairePage } from './moninventaire.page';
import { BijouxmanquantsPage } from '../bijouxmanquants/bijouxmanquants.page';

const routes: Routes = [
  {
    path: '',
    component: MoninventairePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MoninventairePage,BijouxmanquantsPage],
  entryComponents:[MoninventairePage,BijouxmanquantsPage]
})
export class MoninventairePageModule {}
