import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HistoriquerecuPage } from './historiquerecu.page';
import { FaturerecuPage } from '../faturerecu/faturerecu.page';
import { FacturebijouxComponent } from '../facturebijoux/facturebijoux.component';
import { FacturebijouxPage } from '../facturebijoux/facturebijoux.page';

const routes: Routes = [
  {
    path: '',
    component: HistoriquerecuPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HistoriquerecuPage,FaturerecuPage,FacturebijouxComponent,FacturebijouxPage],
  entryComponents:[HistoriquerecuPage,FaturerecuPage,FacturebijouxComponent,FacturebijouxPage]
})
export class HistoriquerecuPageModule {}
