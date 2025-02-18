import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'
import { Observable } from 'rxjs';
import { Response } from '../../_models/response';


@Injectable({
  providedIn: 'root'
})
export class UpdateQtyRequestsService {
  private baseUrl = `${environment.apiUrl}/api/admin/product`;

  constructor(private http: HttpClient) { }

  getAllRequests(page: number,sort:string,status:string,search:String): Observable<Response<any>> {
    var result =this.http.get<any>(`${this.baseUrl}/all/updateQtyRequests?page=${page}&sort=${sort}&status=${status}&search=${search}`);
    return result;
  }
  changeStatus(id:string,status:string,qty:number)
  {
    var result =this.http.patch<any>(`${this.baseUrl}/ChangeUpdateQuantityRequest/${id}/${status}?qty=${qty}`,{});
    return result;
    
  }
  

}