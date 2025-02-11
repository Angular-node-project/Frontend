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

  getAllOrders(page: number,sort:string,status:string,search:String): Observable<Response<any>> {
    var result = this.http.get<any>(`${this.baseUrl}?page=${page}&sort=${sort}&status=${status}&governorate=${search}`);
    return result;
  }
  changeStatus(id:string,status:string)
  {
    const result = this.http.patch<any>(`${this.baseUrl}/ChangeOrderStatus/${id}/${status}`,{});
    return result;
  }
  
cancelOrder(id:string)
{
    
}
}
  