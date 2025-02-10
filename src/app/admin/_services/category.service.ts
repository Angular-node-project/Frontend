import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'
import { Observable } from 'rxjs';
import { Response } from '../../_models/response';
import { Category } from 'src/app/_models/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = `${environment.apiUrl}/api/admin/category`;

  constructor(private http: HttpClient) { }

  getAllcategories(page: number,status:string,name:String): Observable<Response<any>> {
    var result = this.http.get<any>(`${this.baseUrl}?page=${page}&status=${status}&name=${name}`);
    return result;
  }
  changeStatus(id:string,status:string)
  {
    const result = this.http.patch<any>(`${this.baseUrl}/changeStatus/${id}/${status}`,{});
    return result;
  }
  
  getActiveCategories(): Observable<Response<any>> {
    const result = this.http.get<any>(`${this.baseUrl}`);
    return result;
  }

  

  addCategory(name: string): Observable<Response<any>> {
    return this.http.post<any>(`${this.baseUrl}`,{name});
  }


}
  