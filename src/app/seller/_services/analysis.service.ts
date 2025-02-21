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

  countSellerProducts(sellerId: string): Observable<{ status: number, message: string, data: { count: number } }> {
    return this.http.get<{ status: number, message: string, data: { count: number } }>(`${this.baseUrl}/countSellerProducts/${sellerId}`);
  }

  countOrdersForSeller(sellerId: string, status: string): Observable<{ status: number, message: string, data: { count: number } }> {
    return this.http.get<{ status: number, message: string, data: { count: number } }>(`${this.baseUrl}/countOrdersForSeller/${sellerId}/${status}`);
  }

}
