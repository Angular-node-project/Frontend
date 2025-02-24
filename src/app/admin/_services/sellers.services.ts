import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'
import { Observable } from 'rxjs';
import { Response } from '../../_models/response';
import { Category } from 'src/app/_models/category';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private baseUrl = `${environment.apiUrl}/api/admin/sellers`;

  constructor(private http: HttpClient) { }

  getsellersByStatus(status:String): Observable<Response<any>> {
    var result = this.http.get<any>(`${this.baseUrl}/${status}`);
    return result;
  }
  getAllsellers(page: number,sort:string,status:string,search:String): Observable<Response<any>> {
    var result = this.http.get<any>(`${this.baseUrl}?page=${page}&sort=${sort}&status=${status}&search=${search}`);
    return result;
  }
  Changestatus(id:string,status:string):Observable<Response<any>>
  {
    var result = this.http.patch<any>(`${this.baseUrl}/changeStatus/${id}/${status}`,{});
    return result;
  }
  AddSeller(seller:any):Observable<Response<any>>
  {
    var result = this.http.post<any>(`${this.baseUrl}/AddSeller`,seller);
    return result;
  }
 UpdateSeller(sellerid:string, seller:any):Observable<Response<any>>
  {
    var result = this.http.patch<any>(`${this.baseUrl}/updateseller/${sellerid}`, seller);
    return result;
  }

}
