import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from 'src/app/_models/product';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CashierService {

  constructor() { }

getCartGuest(): Observable<any[]> {
  const cart = localStorage.getItem('CashierCart');
  if (!cart) {
    // Return an empty array wrapped in an Observable
    return of([]);
  }

  // Parse the cart from localStorage and return it as an Observable
  let allCartProducts: Product[] = JSON.parse(cart);
  return of(allCartProducts); // Wrap the array in an Observable using `of`
}




}
