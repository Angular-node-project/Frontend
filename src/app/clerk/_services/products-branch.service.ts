import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'
import { Observable } from 'rxjs';
import { Product } from 'src/app/_models/product';
import { QtyRequest, QtyRequestClerk } from 'src/app/_models/QtyRequests';
import { Response } from 'src/app/_models/response';

@Injectable({
  providedIn: 'root'
})
export class ProductsBranchService {
    private baseUrl = `${environment.apiUrl}/api/clerkBranch/products`;
    constructor( private http: HttpClient) { }
    
    getAllPaginatedProducts(page:number,status:string,search:string):Observable<Response<any>>{
       var result= this.http.get<Response<any>>(`${this.baseUrl}?page=${page}"}&status=${status}&search=${search}`);
       return result;

    }
    getAllActiveProducts():Observable<Response<Product[]>>{
      var result= this.http.get<Response<Product[]>>(`${this.baseUrl}/active`);
      return result;
    }

    addQtyRequests(qtyRequests:QtyRequestClerk[]):Observable<Response<any>>{
      var result=this.http.post<Response<any>>(`${this.baseUrl}/qty/request`,qtyRequests);
      return result;
    }
    getProductBranchQty(product_id:string):Observable<Response<number>>{
      var result=this.http.get<Response<number>>(`${this.baseUrl}/qty?product_id=${product_id}`);
        return result;
      
    }

}
