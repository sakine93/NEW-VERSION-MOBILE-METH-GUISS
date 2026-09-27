import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-showcustomer',
  templateUrl: './showcustomer.page.html',
  styleUrls: ['./showcustomer.page.scss'],
})
export class ShowcustomerPage implements OnInit {

  datevente: string='';
  desc_customer: string;
  id: number;
  type_or:string='';
  customers: any = [];
  sale_id:number;
  limit: number =10;
  start :number = 0;

    constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private actRoute: ActivatedRoute
  ) { }

   ngOnInit() {
    this.actRoute.params.subscribe((data: any) =>{
    this.id = data.id;
  
    console.log(data);

    });
  }

  showCustomer() {
  
    return new Promise(resolve => {
      let body = {
        aksi: 'showdetails',
        limit : this.limit,
        start : this.start,
        sale_id : this.id
      };

     

      this.postPvdr.postData(body, 'file_aksi.php').subscribe(data => {
        for (let customer of data.result) {
         
          this.customers.push(customer);
         
        }
        resolve(true);
      });

  
    });
  }

}
