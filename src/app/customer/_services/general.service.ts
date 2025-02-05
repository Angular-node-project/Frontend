import { Injectable } from '@angular/core';
import { AuthCustomerService } from './authCustomer.service';
import { CartService } from './cart.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  constructor(private authCustomerService:AuthCustomerService, private cartService:CartService) { }
  
  cartProductNumRegisterd(callback: (n: number) => any){
     this.cartService.productNum$.subscribe(e=>{
       callback(e);
     })

  }

}
