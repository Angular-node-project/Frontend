import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Response } from 'src/app/_models/response';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  private baseUrl = `${environment.apiUrl}/api/seller/analysis`;

  constructor(private http: HttpClient) { }

  countSellerProducts(sellerId: string): Observable<Response<any>> {
    return this.http.get<Response<any>>(`${this.baseUrl}/countSellerProducts/${sellerId}`);
  }

  countOrdersForSeller(sellerId: string, status: string): Observable<any> {
    return this.http.get<Response<any>>(`${this.baseUrl}/countOrdersForSeller/${sellerId}/${status}`);
  }
  countSellerProductsByStatus(sellerId: string, status: string): Observable<any> {
    return this.http.get<Response<any>>(`${this.baseUrl}/countSellerProductsByStatus/${sellerId}/${status}`);
  }
  getTopSellingProducts(sellerId: string, limit: number = 5): Observable<Response<any>> {
    return this.http.get<Response<any>>(`${this.baseUrl}/topSellingProducts/${sellerId}?limit=${limit}`);
  }
  

}
