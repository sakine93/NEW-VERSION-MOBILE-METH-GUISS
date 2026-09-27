import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TitrevendrePage } from './titrevendre.page';
import { CustomerPage } from '../customer/customer.page';

const routes: Routes = [
  {
    path: '',
    component: TitrevendrePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TitrevendrePage,CustomerPage],
  entryComponents:[CustomerPage,TitrevendrePage]
})
export class TitrevendrePageModule {}
