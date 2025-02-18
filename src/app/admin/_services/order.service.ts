import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'
import { Observable } from 'rxjs';
import { Response } from '../../_models/response';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = `${environment.apiUrl}/api/admin/order`;

  constructor(private http: HttpClient) { }


  getAllOrders(page: number,sort:string,status:string,search:String,type:string): Observable<Response<any>> {
    var result = this.http.get<any>(`${this.baseUrl}?page=${page}&sort=${sort}&status=${status}&governorate=${search}&type=${type}`);
    return result;
  }
  changeStatus(id: string, status: string) {
    const result = this.http.patch<any>(`${this.baseUrl}/ChangeOrderStatus/${id}/${status}`, {});
    return result;
  }

  cancelOrder(id: string) {

  }

  assignBranches(data:any):Observable<Response<any>>{
    var body={data:data}
    const result= this.http.post<Response<any>>(`${this.baseUrl}/assign/branches`,body);
    return result;
  }
}
