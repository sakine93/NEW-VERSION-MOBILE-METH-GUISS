import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UpdatecustomerpoidsvdPage } from './updatecustomerpoidsvd.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatecustomerpoidsvdPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UpdatecustomerpoidsvdPage]
})
export class UpdatecustomerpoidsvdPageModule {}
