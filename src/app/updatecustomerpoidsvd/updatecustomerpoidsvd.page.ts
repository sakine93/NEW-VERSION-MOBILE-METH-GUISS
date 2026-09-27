import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-updatecustomerpoidsvd',
  templateUrl: './updatecustomerpoidsvd.page.html',
  styleUrls: ['./updatecustomerpoidsvd.page.scss'],
})
export class UpdatecustomerpoidsvdPage implements OnInit {

  name: string = '';
  item_unit_price: number ;
  systeme_vente:string='';
  id: number;
  prix_du_g:number;
  prix_vente_g:number;
  poids:number;
  quantity:number;
  location_id:number;
  poidsvendu:number;
  messerreur:string ='';

  constructor(
    private postPvdr: PostProvider,
    private router: Router,
    public toastController: ToastController,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      this.id = data.id;
      this.item_unit_price = data.item_unit_price;
      this.name = data.name;
      this.systeme_vente = data.systeme_vente;
      this.prix_du_g = data.prix_du_g;
      this.prix_vente_g = data.prix_vente_g;
      this.poids = data.poids;
      this.quantity = data.quantity;
      this.location_id= data.location_id;
      console.log(data);
      });
  }
  verifprix(){
  /* var nb1 = this.poids;
   var nb2 = this.item_unit_price;
   var nb3 = this.prix_vente_g;
   var calcul =nb2/nb1;
if(nb2<nb3){
 this.messerreur ='Le prix nest pas bon';
  
  //this.item_unit_price ='';
}else if(nb2>=nb3){
  this.messerreur ='';
}
*/
  }
  async updateProsesv() {
    if ((this.prix_du_g * this.poids) > this.item_unit_price){
      const toast = await this.toastController.create({
        message: 'Veuillez revoir le prix du grammage svp pois < 1',
        duration: 2000
      });
      toast.present();
    }
     else {
      let body = {
        aksi: 'updatepoidspiece',
        num_sale : this.id,
        item_unit_price : this.item_unit_price,
        poids:this.poids,
        quantity:this.quantity,
        location_id:this.location_id,
        
        
     
      };
      this.postPvdr.postData(body, 'file_aksi.php').subscribe( async data => {
        var alertpesan = data.msg;
        if (data.success) {
          this.router.navigate(['/customer']);
          
          const toast = await this.toastController.create({
            message: 'Bijoux mise a jour avec succes',
            duration: 2000
          });
          toast.present();
        } else {
          const toast = await this.toastController.create({
            message: alertpesan,
            duration: 2000
          });
        }
      });


    }
  }


}
