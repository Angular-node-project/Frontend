import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private authenticationService: AuthService) { }

  getRole() {
    var userData = this.authenticationService.getLoggedInData('admin');
    return userData.role || '';
  }

  hasPermission(controller: string, action: string): boolean {
    const userData = this.authenticationService.getLoggedInData('admin');

    if (!userData) {
      return false; 
    }

    if (userData.role === 'super_admin') {
      return true; 
    }

    const userPermissions = userData.permissions || [];

    return userPermissions.some((perm: { controller: string; action: string }) =>
      perm.controller === controller && perm.action === action
    );
  }

}
