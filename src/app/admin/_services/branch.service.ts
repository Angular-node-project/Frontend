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
}
