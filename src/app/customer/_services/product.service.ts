import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'
import { Observable } from 'rxjs';
import { Response } from '../_models/response';
import { Product } from '../_models/product';

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
  getProductDetails(id:string):Observable<Response<Product>>{
    var result=this.http.get<Response<Product>>(`${this.baseUrl}/${id}`);
    return result;
  }
}
