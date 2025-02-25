import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthAdminService } from './_services/authAdmin.service';
import { AuthService } from '../_services/auth.service';

export const authorizationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const authAdminService = inject(AuthAdminService);
  const authGeneralService = inject(AuthService);

  const availableRoutes = [
    { pattern: /^\/admin\/dashboard$/, controller: 'analysis', action: 'show' },
    { pattern: /^\/admin\/products\/\d+$/, controller: 'products', action: 'show' },
    { pattern: /^\/admin\/clerks\/\d+$/, controller: 'systemClerks', action: 'show' },
    { pattern: /^\/admin\/roles\/\d+$/, controller: 'roles', action: 'show' },
    { pattern: /^\/admin\/seller\/\d+$/, controller: 'sellers', action: 'show' },
    { pattern: /^\/admin\/order\/\d+$/, controller: 'orders', action: 'show' },
    { pattern: /^\/admin\/category\/\d+$/, controller: 'categories', action: 'show' },
    { pattern: /^\/admin\/customerservice\/\d+$/, controller: 'customerService', action: 'show' },
    { pattern: /^\/admin\/branch\/\d+$/, controller: 'branches', action: 'show' },
    { pattern: /^\/admin\/clerkBranch\/\d+$/, controller: 'branchClerks', action: 'show' },
    { pattern: /^\/admin\/UpdateRequests\/\d+$/, controller: 'sellerRequests', action: 'show' },
    { pattern: /^\/admin\/UpdateQty\/\d+$/, controller: 'clerkRequests', action: 'show' },
  ];

  const userData = authAdminService.getUserData();
  if (!userData) {
    router.navigate(['/admin/login']);
    return false;
  }

  if (userData.role_name === 'super_admin') {
    return true; 
  }

  const userPermissions = userData.permissions || [];
  const currentPath = state.url;

  const matchingRoute = availableRoutes.find(route => route.pattern.test(currentPath));

  if (!matchingRoute) {
    router.navigate(['/admin/unauthorized']);
    return false;
  }

  const hasPermission = userPermissions.some(
    perm => perm.controller === matchingRoute.controller && perm.action === matchingRoute.action
  );

  if (!hasPermission) {
    router.navigate(['/admin/unauthorized']);
    return false;
  }

  return true; 
};
