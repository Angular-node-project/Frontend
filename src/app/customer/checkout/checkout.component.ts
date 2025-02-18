import { Component } from '@angular/core';
import { CartService } from '../_services/cart.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Cart } from 'src/app/_models/cart';
import { ToastrService } from 'ngx-toastr';
import { Toast } from 'bootstrap';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-checkout',
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  data: Cart | null = null;
  address: string = '';
  city: string = '';
  zipCode: string = '';
  PhoneNumber: string = '';
  isCash=true

  form: FormGroup = new FormGroup({
    Address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required, Validators.minLength(5)]),
    phone_number: new FormControl('',[Validators.required,Validators.pattern(/^(011|012|010|015)\d{8}$/)]),
  });



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




  addOrder(address: any, zipcode: any, phone_number: any, governorate: any,addInfo:any) {
    let toast=this.toastr
    let route=this.route
    let cart = this.data;
    let product=this.data?.product
    let customer_id=this.data?.customer_id;
    let additional_data=addInfo||" "
    let totalPrice=this.data?.Total

    if(!(address && zipcode && phone_number && governorate) ){
      this.toastr.error("Please Complete your Billing details")
    }else{
      console.log("Entered")
      if(this.isCash){
        this.cartSer
        .addOrder({ address, zipcode, phone_number, governorate, product,customer_id,additional_data, totalPrice })
        .subscribe({
          next:(e)=> {
            if(e.data.success){
              console.log(e)
              toast.success(e.message)
              route.navigate(['/']);
            }else{
              console.log(e)
              toast.error(e.data.ErrorMsg)
              this.data!.product=e.data.data.product
              this.data!.Total=0;
              this.data!.product.forEach(p=>{
                this.data!.Total+=(p.price*p.qty)
              })

            }
          },
        });
      }else{
        this.cartSer.OnlinePayment({ address, zipcode, phone_number, governorate, product,customer_id,additional_data, totalPrice }).subscribe({
          next:(e)=>{
            console.log(e.data)
            // window.location.href = `${e.data.url}`;
          }
        })
      }
    }
  }





}
