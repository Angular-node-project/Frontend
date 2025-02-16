import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Response } from '../../_models/response';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = `${environment.apiUrl}/api/seller/order`;

  constructor(private http: HttpClient) { }

  getOrdersBySellerId(sellerId: string, page: number, limit: number): Observable<Response<any>> {
    const result = this.http.get<any>(`${this.baseUrl}/${sellerId}?page=${page}&limit=${limit}`);
    return result;
  }
}
