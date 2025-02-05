import { Component } from '@angular/core';
import { CartService } from '../_services/cart.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Cart } from 'src/app/_models/cart';
import { ToastrService } from 'ngx-toastr';
import { Toast } from 'bootstrap';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-checkout',
  imports: [RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  data: Cart | null = null;
  address: string = '';
  city: string = '';
  zipCode: string = '';
  PhoneNumber: string = '';

  constructor(public cartSer: CartService, private auth: AuthService,private toastr: ToastrService,private route:Router) { }
  ngOnInit(): void {
    this.cartSer.getCart().subscribe((e) => {
      console.log(e.product);

      this.data = e;
      this.data.Total = 0;
      e.product.forEach((p) => {
        this.data!.Total += +p.price * +p.qty;
      });
    });
    console.log(this.auth.getLoggedInId('customer'));
  }

  addOrder(address: any, zipcode: any, phone_number: any, governorate: any) {
    let toast=this.toastr
    let route=this.route
    let cart = this.data;
    let product=this.data?.product
    let customer_id=this.data?.customer_id;
    if(!(address && zipcode && phone_number && governorate) ){
      this.toastr.error("Please Complete your Billing details")
    }else{
      console.log("Entered")
      this.cartSer
      .addOrder({ address, zipcode, phone_number, governorate, product,customer_id })
      .subscribe({
        next(e) {
        toast.success(e.message)
        route.navigate(['/']);
        },
      });
    }
    // console.log(address);
    // console.log(zipcode);
    // console.log(phone_number);
    // console.log(governorate);
    // console.log(cart);


  }
}
