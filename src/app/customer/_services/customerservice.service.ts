import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'
import { Observable } from 'rxjs';
import { Response } from '../../_models/response';
import { CustomerService } from 'src/app/_models/customerservice';



@Injectable({
  providedIn: 'root'
})
export class Customerservice {
  private baseUrl = `${environment.apiUrl}/api/customer/customerservice`;

  constructor(private http: HttpClient) { }

 

 SendMessaege(data:any)
 {
    const result = this.http.post<any>(`${this.baseUrl}`,data);
    return result;
 }

}