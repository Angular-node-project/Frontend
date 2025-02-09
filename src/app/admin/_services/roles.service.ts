import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'
import { Observable } from 'rxjs';
import { Response } from 'src/app/_models/response';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
 private baseUrl = `${environment.apiUrl}/api/admin/role`;
  constructor(private http:HttpClient) { }
  
  getAllClerks(page:number):Observable<Response<any>>{
    var result=this.http.get<Response<any>>(`${this.baseUrl}?page=${page}`);
    return result;
  }
}
