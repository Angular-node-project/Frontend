import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { environment } from '@environments/environment'
import { Observable } from 'rxjs';
import { Response } from 'src/app/_models/response';
import { HttpClient } from '@angular/common/http';
import { AuthenticatedClerk, ClerkLogin } from 'src/app/_models/clerk';
import { Permission } from 'src/app/_models/role-permisssion';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {

  private baseUrl = `${environment.apiUrl}/api/admin/account`;
  constructor(private authGeneralService: AuthService, private http: HttpClient) { }

  login(email: string, password: string): Observable<Response<string>> {
    var res = this.http.post<Response<string>>(`${this.baseUrl}/login`, new ClerkLogin(email, password));
    return res;

  }

  resetPassword():Observable<Response<any>>{
    var res = this.http.post<Response<any>>(`${this.baseUrl}/password/reset`,{});
    return res;
  }

  isLoggedIn(): boolean {
    return this.authGeneralService.isLoggedIn('admin');
  }
  getLoggedInName(): string {
    return this.authGeneralService.getLoggedInName('admin');
  }

  getUserData(): AuthenticatedClerk {
    var decodedToken = this.authGeneralService.getLoggedInData('admin');
    return new AuthenticatedClerk(
      decodedToken.id,
      decodedToken.email,
      decodedToken.name,
      decodedToken.user_type, 
      decodedToken.role_id,
      decodedToken.role_name,
      decodedToken.permissions
    );

  }

}
