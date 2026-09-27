import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MiseajourapkPage } from './miseajourapk.page';

const routes: Routes = [
  {
    path: '',
    component: MiseajourapkPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MiseajourapkPage]
})
export class MiseajourapkPageModule {}
