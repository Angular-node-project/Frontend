import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from 'src/app/_models/product';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CashierService {
  private baseUrl = `${environment.apiUrl}/api/cashier/order`;

  constructor(public http: HttpClient) { }

  addCashierOrder(data: any) {
    return this.http.post<{ status: number, message: string, data: { ErrorMsg: string, success: boolean, data: any } }>
    (`${this.baseUrl}`, data)
  }




}
