import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Response } from '../../_models/response';
import { Product } from '../../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = `${environment.apiUrl}/api/seller/product`;

  constructor(private http: HttpClient) { }

  getProductsBySeller(sellerId: string, page: number, sort: string, category: string, status: string, search: string): Observable<Response<any[]>> {
    return this.http.get<Response<any[]>>(`${this.baseUrl}/${sellerId}?page=${page}&sort=${sort}&category=${category}&status=${status}&search=${search}`);
  }
  getProductsBySellerPaginated(sellerId: string, page: number, limit: number, sort: string, category: string, status: string, search: string):
   Observable<Response<any>> {
    return this.http.get<Response<any>>(`${this.baseUrl}/${sellerId}?page=${page}&limit=${limit}&sort=${sort}&category=${category}&status=${status}&search=${search}`);
  }
  changeStatus(id:string,status:string)
  {
    const result = this.http.patch<any>(`${this.baseUrl}/changeStatus/${id}/${status}`,{});
    return result;
  }

  addProduct(sellerId: string, productData: FormData): Observable<Response<Product>> {
    return this.http.post<Response<Product>>(`${this.baseUrl}/${sellerId}`, productData);
  }

  updateProduct(sellerId: string, productId: any, productData: any): Observable<Response<Product>> {
    return this.http.patch<Response<Product>>(`${this.baseUrl}/${sellerId}/${productId}`, productData);
  }

  deleteProduct(sellerId: string, productId: string): Observable<Response<Product>> {
    return this.http.delete<Response<Product>>(`${this.baseUrl}/${sellerId}/${productId}`);
  }
  getActiveCategories(): Observable<Response<any>> {
    const result = this.http.get<any>(`${environment.apiUrl}/api/seller/category`);
    return result;
  }
}
