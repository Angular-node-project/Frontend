import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Cart } from 'src/app/_models/cart';
import { CartProduct } from 'src/app/_models/cart-product';
import { Response } from 'src/app/_models/response';
import { environment } from '@environments/environment'
import { GeneralService } from './general.service';
import { AuthCustomerService } from './authCustomer.service';
import { ProductService } from './product.service';

interface cartguestproduct {
  productId: string;
  qty: number;
}
@Injectable({
  providedIn: 'root'
})


export class CartService {
  private baseUrl = `${environment.apiUrl}/api/customer/cart`;
  private productNumSubject = new BehaviorSubject<number>(0);
  productNum$ = this.productNumSubject.asObservable();

  constructor(public http: HttpClient,private productService:ProductService,private authCustomerService:AuthCustomerService) { }

  // Example service method
  getCart(): Observable<Cart> {
    return this.http.get<{ status: number, message: string, data: { cart: any, ErrorMsg: string[] } }>("http://localhost:5000/api/customer/cart")
      .pipe(
        map(response => {
          const cartData = response.data.cart || Cart;
          console.log(cartData);
          return new Cart(
            cartData._id,
            cartData.cart_id,
            cartData.product || [],
            cartData.customer_id,
            new Date(cartData.createdAt),
            new Date(cartData.updatedAt),
            cartData.Total
          );
        })
      );
  }

  UpdateQty(data: any) {
    var ob = this.http.post<{ status: number, message: string, data: { ErrorMsg: string, success: boolean, newQty: number } }>(`${this.baseUrl}/changeQty`, data);
    return ob;
  }

  addProductToCart(data: any) {
    var ob = this.http.post<{ status: number, message: string, data: { ErrorMsg: string, success: boolean, newQty: number } }>(`${this.baseUrl}/AddProcuct`, data);
    return ob;
  }

  addOrder(data: any) {
    return this.http.post<{ status: number, message: string, data: { ErrorMsg: string, success: boolean, order: any } }>(`http://localhost:5000/api/customer/order`, data)
  }

  updateCartRegisterdCustomerProductNum(): void {
    if(this.authCustomerService.isLoggedIn()){
      this.getCart().subscribe(e => {
        const count = e.product.length;
        this.productNumSubject.next(count);
      })
    }else{
      var cart = localStorage.getItem('cart');
      let allCartProducts: cartguestproduct[] = cart ? JSON.parse(cart) : [];
      this.productNumSubject.next(allCartProducts.length);
    }
  }


  updateProductToCartGuest(data: any, type: 'more' | 'one') {
    var cart = localStorage.getItem('cart');
    let allCartProducts: cartguestproduct[] = cart ? JSON.parse(cart) : [];
    const existingProduct = allCartProducts.find(item => item.productId === data.productId);
    if (!existingProduct && type == 'one') {
      allCartProducts.push(data);
    }else if(existingProduct && type=='more'){
      existingProduct.qty=data.qty;
    }else if(!existingProduct &&type=='more') {
      allCartProducts.push(data);
    }
    localStorage.setItem('cart', JSON.stringify(allCartProducts));
    this.updateCartRegisterdCustomerProductNum()
  }
  removeProductFromCartGuest(product_id:string){
    var cart = localStorage.getItem('cart');
    let allCartProducts: cartguestproduct[] = cart ? JSON.parse(cart) : [];
    const existingProduct = allCartProducts.find(item => item.productId ===product_id);
    if(existingProduct){
      allCartProducts=allCartProducts.filter(p=>p.productId!=product_id);
      localStorage.setItem('cart', JSON.stringify(allCartProducts));
    }

  }

 
  getCartGuest():Observable<any[]>{
   
    const cart=localStorage.getItem('cart');
    if(!cart){
      return new Observable((observer)=>observer.next([]))
    }
    let allCartProducts: cartguestproduct[]=JSON.parse(cart);
    const getProductDetailsRequests=allCartProducts.map(product=>this.productService.getProductDetails(product.productId));
    return forkJoin(getProductDetailsRequests).pipe(
      map((products:any[])=>{
        return allCartProducts.map((cartProduct, index) => {
          return { 
            ...cartProduct, 
            productDetails: products[index].data 
          };
        });
      })
    )
  }


  addListProductCartGuest(cartProduct:CartProduct[]):Observable<Response<Cart>>{
    var res= this.http.post<Response<Cart>>(`${this.baseUrl}`,cartProduct);
    return res;
  }

}
