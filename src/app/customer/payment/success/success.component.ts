import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BillingDetails, Cart } from 'src/app/_models/cart';
import { CartService } from '../../_services/cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-success',
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent implements OnInit {


constructor(public cartSer: CartService,private route: Router,private toastr: ToastrService){}


BillingDetails:BillingDetails|null=null
data: Cart | null = null


  ngOnInit(): void {

    this.cartSer.getCart().subscribe({
      next:(e)=>{
        this.getBillingDetails()
        console.log("*************************************")
        console.log(this.BillingDetails)
        console.log(e.product);
          this.data = e;
          this.data.Total = 0;
          e.product.forEach((p) => {
            this.data!.Total += +p.price * +p.qty;
          });
          let address=this.BillingDetails?.address
          let zipcode=this.BillingDetails?.zipcode
          let phone_number=this.BillingDetails?.phone_number
          let governorate=this.BillingDetails?.governorate
          let additional_data=this.BillingDetails?.additional_data
          let product = this.data?.product
          let customer_id = this.data?.customer_id;
          let totalPrice = this.data?.Total

          this.cartSer.addOrder({ address, zipcode, phone_number, governorate, product, customer_id, additional_data, totalPrice })
        .subscribe({
          next: (e) => {
            if (e.data.success) {
              console.log(e)
              this.route.navigate(['/']);
              this.toastr.success(e.message)
              this.removeBillingDetails()
            }

          },
        });

      }


    });



  }



  getBillingDetails() {
    const cart = localStorage.getItem('BillingDetails');
    this.BillingDetails = JSON.parse(cart!)
  }
  removeBillingDetails(){
    localStorage.removeItem("BillingDetails")
  }
}
