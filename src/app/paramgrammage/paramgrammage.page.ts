import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-paramgrammage',
  templateUrl: './paramgrammage.page.html',
  styleUrls: ['./paramgrammage.page.scss'],
})
export class ParamgrammagePage implements OnInit {

  public type_or: any = '';
  item_unit_price: number ;
  id: number;
  prix_du_g:number;
  prix_vente_g:number;
  poids:number;
  messerreur:string ='';

  constructor(
    private postPvdr: PostProvider,
    private router: Router,
    public toastController: ToastController,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      this.prix_vente_g = data.prix_vente_g;
      this.type_or = data.type_or;
   
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
  async updategrammage() {
    if (this.prix_vente_g < 0){
      const toast = await this.toastController.create({
        message: 'Veuillez mettre le prix de vente du grammage svp',
        duration: 2000
      });
      toast.present();
    } else {
      let body = {
        aksi: 'updateprixgramme',
        type_or : this.type_or,
        prix_vente_g : this.prix_vente_g,
        
     
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
