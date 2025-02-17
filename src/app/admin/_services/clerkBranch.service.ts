import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'
import { Observable } from 'rxjs';

import { Response } from 'src/app/_models/response';

@Injectable({
  providedIn: 'root'
})
export class ClerkBranchService {
 private baseUrl = `${environment.apiUrl}/api/admin/clerkBranch`;

  constructor(private http: HttpClient) { }

  getAllClerkBranches(page: number,sort:string,status:string,search:String): Observable<Response<any>> {
    var result = this.http.get<any>(`${this.baseUrl}?page=${page}&status=${status}&search=${search}&sort=${sort}`);
    return result;
  }
  changeStatus(id:string,status:string)
  {
    const result = this.http.patch<any>(`${this.baseUrl}/changestatus/${id}/${status}`,{});
    return result;
  }

  addClerkBranch(clerkbranchData: any): Observable<Response<any>> {
    return this.http.post<any>(`${this.baseUrl}`,clerkbranchData);
  }
 updateClerkBranch(id:String,clerkbranchData: any): Observable<Response<any>> {
    return this.http.patch<any>(`${this.baseUrl}/${id}`,clerkbranchData);
  }
}
