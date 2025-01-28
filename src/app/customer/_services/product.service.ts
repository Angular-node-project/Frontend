import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'
import { Observable } from 'rxjs';
import { Response } from '../_models/response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = `${environment.apiUrl}/api/customer/product`;

  constructor(private http: HttpClient) { }

  getActiveProducts(page: number): Observable<Response<any>> {
    var result = this.http.get<any>(`${this.baseUrl}?page=${page}`);
    return result;
  }
}
