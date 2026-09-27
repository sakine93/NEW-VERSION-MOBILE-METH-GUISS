import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CustomerPage } from '../customer/customer.page';

@Component({
  selector: 'app-facturebijoux',
  templateUrl: './facturebijoux.component.html',
  styleUrls: ['./facturebijoux.component.scss'],
})
export class FacturebijouxComponent implements OnInit {

  constructor(
    private modalCtrl :ModalController,
  ) { }

  ngOnInit() {}

  dismissModal(){
 
  alert('nn');
    
  }

}
