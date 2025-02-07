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
  private baseUrl = `${environment.apiUrl}/api/customer/product`;

  constructor(private http: HttpClient) { }

  getActiveProducts(page: number,sort:string,category:string): Observable<Response<any>> {
    var result = this.http.get<any>(`${this.baseUrl}?page=${page}&sort=${sort}&category=${category}`);
    return result;
  }
  getProductDetails(id:string):Observable<Response<Product>>{
    var result=this.http.get<Response<Product>>(`${this.baseUrl}/${id}`);
    return result;
  }
   getActiveCategories():Observable<Response<any>>{
    var result= this.http.get<Response<Category[]>>(`${this.baseUrl}/categories`);
    return result;
   }
   addReview(review:any,productId:string):Observable<Response<Product>>{
    var result= this.http.post<Response<Product>>(`${this.baseUrl}/addReview/${productId}`,review);
    return result;

   }

   
}
