import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'
import { Observable } from 'rxjs';
import { ClerkBranch, ClerkBranchLogin } from 'src/app/_models/clerkBranch';
import { Response } from 'src/app/_models/response';
import { AuthService } from 'src/app/_services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthClerkBranchService {
  private baseUrl = `${environment.apiUrl}/api/clerkBranch/account`;
  constructor(private authGeneralService: AuthService, private http: HttpClient) { }

  login(email: string, password: string): Observable<Response<string>> {
    var res = this.http.post<Response<string>>(`${this.baseUrl}/login`, new ClerkBranchLogin(email, password));
    return res;

  }

  isLoggedIn(): boolean {
    return this.authGeneralService.isLoggedIn('clerkBranch');
  }
  getLoggedInName(): string {
    return this.authGeneralService.getLoggedInName('clerkBranch');
  }
  logout(){
    return this.authGeneralService.logout("clerkBranch");
  }
  getLoggedInData():ClerkBranch{
    var data =this.authGeneralService.getLoggedInData("clerkBranch");
    return new ClerkBranch(
      data.clerkBranch_id,
      data.name,
      data.email,
      '',
      data.role,
      data.status,
      data.branch?{branch_id:data.branch.branch_id,name:data.branch.name}:{branch_id:"",name:""}
    )
  }
}
