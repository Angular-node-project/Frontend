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
  private baseUrl = `${environment.apiUrl}/api/admin/product`;

  constructor(private http: HttpClient) { }

  getAllProducts(page: number,sort:string,category:string,status:string,search:String):
   Observable<Response<any>> {
    var result = this.http.get<any>(`${this.baseUrl}?page=${page}&sort=${sort}&category=${category}&status=${status}&search=${search}`);
    return result;
  }
  changeStatus(id:string,status:string)
  {
    const result = this.http.patch<any>(`${this.baseUrl}/changeStatus/${id}/${status}`,{});
    return result;
  }

  getActiveCategories(): Observable<Response<any>> {
    const result = this.http.get<any>(`${environment.apiUrl}/api/admin/category`);
    return result;
  }



  addProduct(productData: Product): Observable<Response<any>> {
    return this.http.post<any>(`${this.baseUrl}`, productData);
  }
 UpdateProduct(productData: Product,productId:string): Observable<Response<any>> {
    return this.http.patch<any>(`${this.baseUrl}/${productId}`, productData);
  }

}
