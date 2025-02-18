import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CashierService {
  private baseUrl = `${environment.apiUrl}/api/clerkBranch/cashier/order`;

  constructor(public http: HttpClient) { }

  addCashierOrder(data: any) {
    return this.http.post<{ status: number, message: string, data: { ErrorMsg: string, success: boolean, data: any } }>
    (`${this.baseUrl}`, data)
  }
}
