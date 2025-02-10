import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'
import { Observable } from 'rxjs';
import { Response } from 'src/app/_models/response';
import { Permission, Role } from 'src/app/_models/role-permisssion';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
 private baseUrl = `${environment.apiUrl}/api/admin/role`;
  constructor(private http:HttpClient) { }
  
  getAllRoles(page:number,role_name:string):Observable<Response<any>>{
    var result=this.http.get<Response<any>>(`${this.baseUrl}?page=${page}&role_name=${role_name}`);
    return result;
  }
  getAllPermissions():Observable<Response<Permission[]>>{
    var result=this.http.get<Response<Permission[]>>(`${this.baseUrl}/allPermissions`);
    return result;
  }
  saveRole(newRole:Role):Observable<Response<Role>>{
    var result= this.http.post<Response<Role>>(`${this.baseUrl}`,newRole);
    return result;
  }
  updateRole(role:Role):Observable<Response<any>>{
    var result= this.http.put<Response<any>>(`${this.baseUrl}`,role);
    return result;
  }
  updateRoleStatus(role_id:string,status:string):Observable<Response<any>>{

    var result= this.http.put<Response<any>>(`${this.baseUrl}/${role_id}/${status}`,{});
   return result;
  }
  getActiveRoles():Observable<Response<Role[]>>{
    
    var result= this.http.get<Response<any>>(`${this.baseUrl}/active`);
   return result;
  }
}
