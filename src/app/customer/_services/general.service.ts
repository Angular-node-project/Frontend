import { Injectable } from '@angular/core';
import { AuthCustomerService } from './authCustomer.service';
import { CartService } from './cart.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  constructor(private authCustomerService:AuthCustomerService,private router:Router , private cartService:CartService) { }
  
  cartProductNumRegisterd(callback: (n: number) => any){
     this.cartService.productNum$.subscribe(e=>{
       callback(e);
     })

  }

  updateCustomerCartAfterAuthentication(url:string){
    var cartData=  localStorage.getItem('processedCart');
    var products=cartData? JSON.parse(cartData):[];
    localStorage.removeItem('cart');
    localStorage.removeItem('processedCart');
    if(products?.length>0){
      this.cartService.addListProductCartGuest(products).subscribe({
       next:(response)=>{
        this.cartService.updateCartRegisterdCustomerProductNum();
        this.router.navigate([`${url}`]);
       }
      })
    }else{
      this.router.navigate(['/']);
    }
  }

}
