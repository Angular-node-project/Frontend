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

    if (userData.role_name === 'super_admin') {
      return true; 
    }

    const userPermissions = userData.permissions || [];

    return userPermissions.some((perm: { controller: string; action: string }) =>
      perm.controller === controller && perm.action === action
    );
  }

  getFirstAccessiblePage(): string {
    const userData = this.authenticationService.getLoggedInData('admin');
  
    if (!userData) {
      return '/admin/login'; 
    }
  
    if (userData.role_name === 'super_admin') {
      return '/admin/dashboard'; 
    }
  
    const userPermissions = userData.permissions || [];
  
    const availableRoutes = [
      { path: '/admin/dashboard', controller: 'analysis', action: 'show' },
      { path: '/admin/products/1', controller: 'products', action: 'show' },
      { path: '/admin/clerks/1', controller: 'systemClerks', action: 'show' },
      { path: '/admin/roles/1', controller: 'roles', action: 'show' },
      { path: '/admin/seller/1', controller: 'sellers', action: 'show' },
      { path: '/admin/order/1', controller: 'orders', action: 'show' },
      { path: '/admin/category/1', controller: 'categories', action: 'show' },
      { path: '/admin/customerservice/1', controller: 'customerService', action: 'show' },
      { path: '/admin/branch/1', controller: 'branches', action: 'show' },
      { path: '/admin/clerkBranch/1', controller: 'branchClerks', action: 'show' },

      { path: '/admin/UpdateRequests/1', controller: 'sellerRequests', action: 'show' },
      { path: '/admin/UpdateQty/1', controller: 'clerkRequests', action: 'show' },

    ];
  
    for (const route of availableRoutes) {
      if (userPermissions.some((perm:any)=> perm.controller === route.controller && perm.action === route.action)) {
        return route.path;
      }
    }
  
    return '/admin/unauthorized'; 
  }
}  
