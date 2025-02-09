import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'
import { Observable } from 'rxjs';
import { Response } from '../../_models/response';
import { Product } from '../../_models/product';

@Injectable({
  providedIn: 'root'
})
export class UpdateRequestsService {
  private baseUrl = `${environment.apiUrl}/api/admin/product`;

  constructor(private http: HttpClient) { }

  getAllRequests(page: number,sort:string,category:string,status:string,seller:string,search:String): Observable<Response<any>> {
    var result =
     this.http.get<any>
     (`${this.baseUrl}/All/updateRequests?page=${page}&sort=${sort}&category=${category}&status=${status}&search=${search}&seller=${seller}`);
    return result;
  }
  changeStatus(id:string,status:string)
  {
    const result = this.http.patch<any>(`${this.baseUrl}/ChangeUpdateRequest/${id}/${status}`,{});
    return result;
  }
  

}
  