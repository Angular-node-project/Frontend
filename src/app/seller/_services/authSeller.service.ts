import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { environment } from '@environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from 'src/app/_models/response';
import { Seller } from 'src/app/_models/sellers';

@Injectable({
  providedIn: 'root'
})
export class AuthSellerService {

   private baseUrl = `${environment.apiUrl}/api/seller/account`;
   constructor(private http:HttpClient, private authGeneralService:AuthService) {}
   
  register(newseller:Seller):Observable<Response<Seller>>{
   var result= this.http.post<Response<Seller>>(`${this.baseUrl}/register`,newseller);
   return result;

  }
}
