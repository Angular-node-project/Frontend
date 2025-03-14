import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'
import { Observable } from 'rxjs';
import { Response } from 'src/app/_models/response';

@Injectable({
  providedIn: 'root'
})
export class BranchOrderService {
 private baseUrl = `${environment.apiUrl}/api/clerkBranch/branchOrder`;

  constructor(private http: HttpClient) { }

  
  getAllOrderBranches(page: number,branch_id:string,status:string,search:String): Observable<Response<any>> {
    var result = this.http.get<any>(`${this.baseUrl}?page=${page}&status=${status}&search=${search}&branch_id=${branch_id}`);
    return result;
  }
  changeStatus(order_id:string,status:string):Observable<Response<any>>{
    var result = this.http.put<Response<any>>(`${this.baseUrl}/changestatus/${order_id}/${status}`,{});
    return result;
  }

  cancelBranchOrder(order_id:string):Observable<Response<any>>{
    var result = this.http.put<Response<any>>(`${this.baseUrl}/cancel/${order_id}/`,{});
    return result;
  }
  
}
