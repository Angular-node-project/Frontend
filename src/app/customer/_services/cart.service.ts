import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Cart } from 'src/app/_models/cart';
import { CartProduct } from 'src/app/_models/cart-product';
import { Response } from 'src/app/_models/response';
import { environment } from '@environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = `${environment.apiUrl}/api/customer/cart`;


// Example service method
getCart(): Observable<Cart> {
  return this.http.get<{ status: number, message: string, data: { cart: any, ErrorMsg: string[] } }>("http://localhost:5000/api/customer/cart")
    .pipe(
      map(response => {
        const cartData = response.data.cart || Cart;
        return new Cart(
          cartData._id,
          cartData.cart_id,
          cartData.product||[],
          cartData.customer_id,
          new Date(cartData.createdAt),
          new Date(cartData.updatedAt),
          cartData.Total
        );
      })
    );
}

UpdateQty(data:any) {
  return this.http.post<{ status: number, message: string, data: { ErrorMsg: string , success:boolean , newQty:number  } }>(`${this.baseUrl}/changeQty`,data)
}

addProductToCart(data:any) {
  return this.http.post<{ status: number, message: string, data: { ErrorMsg: string , success:boolean , newQty:number  } }>(`${this.baseUrl}/AddProcuct`,data)
}

addOrder(data:any) {
  return this.http.post<{ status: number, message: string, data: { ErrorMsg: string , success:boolean , order:any  } }>(`http://localhost:5000/api/customer/order`,data)
}

  constructor(public http:HttpClient) { }
}
