import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CashierService {
  private baseUrl = `${environment.apiUrl}/api/clerkBranch/cashier/order`;


  private dataSubject = new ReplaySubject<any>(1); // Replay the last emitted value
  data$ = this.dataSubject.asObservable();
  testing:any

  setData(data: any) {
    console.log('Emitting data:', data);
    this.dataSubject.next(data);
  }

  clearData() {
    this.dataSubject.next(null);
  }

  constructor(public http: HttpClient) { }

  addCashierOrder(data: any) {
    return this.http.post<{ status: number, message: string, data: { ErrorMsg: string, success: boolean, data: any } }>
    (`${this.baseUrl}`, data)
  }
}
