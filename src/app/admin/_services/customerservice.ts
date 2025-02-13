import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'
import { Observable } from 'rxjs';
import { Response } from '../../_models/response';
import { Category } from 'src/app/_models/category';


@Injectable({
  providedIn: 'root'
})
export class Customerservice {
  private baseUrl = `${environment.apiUrl}/api/admin/customerservice`;

  constructor(private http: HttpClient) { }

  getAllMessages(page: number,status:string,search:String): Observable<Response<any>> {
    var result = this.http.get<any>(`${this.baseUrl}?page=${page}&status=${status}&search=${search}&limit=6`);
    return result;
  }

 SendMessaege(email:string,message:String)
 {
    const result = this.http.patch<any>(`${this.baseUrl}/sendEmail/${email}?message=${message}`,{});
    return result;
 }

}
  