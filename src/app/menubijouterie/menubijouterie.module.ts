import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenubijouteriePage } from './menubijouterie.page';

const routes: Routes = [
  {
    path: '',
    component: MenubijouteriePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenubijouteriePage]
})
export class MenubijouteriePageModule {}
