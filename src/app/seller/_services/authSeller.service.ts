import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { environment } from '@environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from 'src/app/_models/response';
import { Seller, SellerLogin } from 'src/app/_models/sellers';

@Injectable({
  providedIn: 'root'
})
export class AuthSellerService {

  private baseUrl = `${environment.apiUrl}/api/seller/account`;
  constructor(private http: HttpClient, private authGeneralService: AuthService) { }

  register(newseller: Seller): Observable<Response<Seller>> {
    var result = this.http.post<Response<Seller>>(`${this.baseUrl}/register`, newseller);
    return result;

  }
  login(email: string, password: string): Observable<Response<string>> {
    var res = this.http.post<Response<string>>(`${this.baseUrl}/login`, new SellerLogin(email, password));
    return res;
  }
  updateProfile(profile:Seller):Observable<Response<any>>{
    var data={data:profile};
    var res = this.http.post<Response<any>>(`${this.baseUrl}/profile`,data );
    return res; 
  }
  isLoggedIn(): boolean {
    return this.authGeneralService.isLoggedIn('seller');
  }
  getLoggedInName(): string {
    return this.authGeneralService.getLoggedInName('seller');
  }
  getLoggedInEmail(): string {
    return this.authGeneralService.getLoggedInEmail('seller');
  }
  getLoggedInId(): string {
    return this.authGeneralService.getLoggedInId('seller');
  }
  getLoggedInData(): Seller {
    var data = this.authGeneralService.getLoggedInData('seller');
    return new Seller(data.seller_id, data.name, data.email, '', data.national_id, data.phone_number, data.registeration_number);
  }
  logout() {
    return this.authGeneralService.logout('seller');
  }


}
