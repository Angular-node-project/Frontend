import { Component } from '@angular/core';
import { CartService } from '../_services/cart.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Cart } from 'src/app/_models/cart';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  data: Cart | null = null;
  address: string = '';
  city: string = '';
  zipCode: string = '';
  PhoneNumber: string = '';

  constructor(public cartSer: CartService, private auth: AuthService) { }
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
    let cart = this.data;
    let product=this.data?.product
    let customer_id=this.data?.customer_id;
    console.log(address);
    console.log(zipcode);
    console.log(phone_number);
    console.log(governorate);
    console.log(cart);
    /*
    0
:
"\"governorate\" is required"
1
:
"\"zipcode\" is required"
2
:
"\"phone_number\" is required"
3
:
"\"product\" is required"
4
:
"\"customer_id\" is required"
5
:
"\"cashier_id\" is required"
6
:
"\"zipCode\" is not allowed"
7
:
"\"phoneNumber\" is not allowed"
8
:
"\"city\" is not allowed"
9
:
"\"cart\" is not allowed"
    */
    this.cartSer
      .addOrder({ address, zipcode, phone_number, governorate, product,customer_id })
      .subscribe({
        next(e) {
          console.log(e);
        },
      });
  }
}
