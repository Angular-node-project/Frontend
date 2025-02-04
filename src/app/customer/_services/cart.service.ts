import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Cart } from 'src/app/_models/cart';
import { CartProduct } from 'src/app/_models/cart-product';
import { Response } from 'src/app/_models/response';

@Injectable({
  providedIn: 'root'
})
export class CartService {


// Example service method
getCart(): Observable<Cart> {
  return this.http.get<{ status: number, message: string, data: { cart: any, ErrorMsg: string[] } }>("http://localhost:5000/api/customer/cart")
    .pipe(
      map(response => {
        const cartData = response.data.cart;
        return new Cart(
          cartData._id,
          cartData.cart_id,
          cartData.product,
          cartData.customer_id,
          new Date(cartData.createdAt),
          new Date(cartData.updatedAt),
          cartData.Total
        );
      })
    );
}

UpdateQty(data:any) {
  return this.http.post<{ status: number, message: string, data: { ErrorMsg: string[] , success:boolean , newQty:number  } }>("http://localhost:5000/api/customer/cart/changeQty",data)
}

addProductToCart(data:any) {
  return this.http.post<{ status: number, message: string, data: { ErrorMsg: string[] , success:boolean , newQty:number  } }>("http://localhost:5000/api/customer/cart/AddProcuct",data)
}

  constructor(public http:HttpClient) { }
}
