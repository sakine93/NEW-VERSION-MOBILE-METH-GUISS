import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ParamgrammagePage } from './paramgrammage.page';

const routes: Routes = [
  {
    path: '',
    component: ParamgrammagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ParamgrammagePage]
})
export class ParamgrammagePageModule {}
