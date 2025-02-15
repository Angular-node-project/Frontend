import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'
import { Observable } from 'rxjs';
import { Branch } from 'src/app/_models/branch';
import { Response } from 'src/app/_models/response';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
 private baseUrl = `${environment.apiUrl}/api/admin/branch`;

  constructor(private http: HttpClient) { }

  getAllActiveBranches():Observable<Response<Branch[]>>{
    var result= this.http.get<Response<Branch[]>>(`${this.baseUrl}/all/active`);
    return result;
  }
  getAllBranches(page: number,sort:string,status:string,search:String): Observable<Response<any>> {
    var result = this.http.get<any>(`${this.baseUrl}?page=${page}&status=${status}&search=${search}&sort=${sort}`);
    return result;
  }
  changeStatus(id:string,status:string)
  {
    const result = this.http.patch<any>(`${this.baseUrl}/changestatus/${id}/${status}`,{});
    return result;
  }

  addBranch(branchData: any): Observable<Response<any>> {
    return this.http.post<any>(`${this.baseUrl}`,branchData);
  }
 updateBranch(id:String,branchData: any): Observable<Response<any>> {
    return this.http.patch<any>(`${this.baseUrl}/${id}`,branchData);
  }
}
