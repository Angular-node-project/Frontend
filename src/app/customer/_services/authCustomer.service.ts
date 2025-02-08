import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'
import { Observable } from 'rxjs';
import { CustomerLogin, CustomerProfileInfo } from 'src/app/_models/customer';
import { Response } from 'src/app/_models/response';
import { AuthService as AuthServiceGeneral } from 'src/app/_services/auth.service';
import { Customer } from 'src/app/_models/customer';

@Injectable({
  providedIn: 'root'
})
export class AuthCustomerService {
  private baseUrl = `${environment.apiUrl}/api/customer/account`;


  constructor(private http: HttpClient,private authServiceGeneral: AuthServiceGeneral) { }

  login(email:string,password:string):Observable<Response<string>>{
    var res= this.http.post<Response<string>>(`${this.baseUrl}/login`,new CustomerLogin(email,password));
    return res;

  }
  register(customer:Customer):Observable<Response<any>>{
    var res= this.http.post<Response<any>>(`${this.baseUrl}/register`,customer);
    return res;
  }
  isLoggedIn():boolean{
    return this.authServiceGeneral.isLoggedIn('customer');
  }
  getLoggedInName():string{
    return this.authServiceGeneral.getLoggedInName('customer');
  }
  getLoggedInId():string{
    return this.authServiceGeneral.getLoggedInId('customer');
  }

  getProfileInfo(){
    return this.http.get<{ status: number, message: string, data: any }>(`${this.baseUrl}`)
  }
  updateProfileInfoWithPassword(data:any){
    return this.http.put<{ status: number, message: string, data: any }>(`${this.baseUrl}/profile`,data)
  }
  updateProfileInfoWithoutPassword(data:any){
    return this.http.put<{ status: number, message: string, data: any }>(`${this.baseUrl}/profile2`,data)
  }



}
