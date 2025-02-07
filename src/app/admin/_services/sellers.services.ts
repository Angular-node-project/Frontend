import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'
import { Observable } from 'rxjs';
import { Response } from '../../_models/response';
import { Category } from 'src/app/_models/category';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private baseUrl = `${environment.apiUrl}/api/admin/sellers`;

  constructor(private http: HttpClient) { }

  getsellersByStatus(status:String): Observable<Response<any>> {
    var result = this.http.get<any>(`${this.baseUrl}/${status}`);
    return result;
  }

}
