import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'
import { Observable } from 'rxjs';
import { Response } from '../../_models/response';
import { Product } from '../../_models/product';
import { Category } from 'src/app/_models/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private Url = `${environment.apiUrl}/api/admin/product`;

  constructor(private http: HttpClient) { }

  getAllProducts(page: number,sort:string,category:string,status:string): Observable<Response<any>> {
    var result = this.http.get<any>(`${this.Url}?page=${page}&sort=${sort}&category=${category}&status=${status}`);
    return result;
  }

}
