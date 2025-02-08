import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthAdminService } from './_services/authAdmin.service';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
    const authAdminService=inject(AuthAdminService);
   if(!authAdminService.isLoggedIn()){
      router.navigate(['/admin/login']);
      return false;
   }
   return true;
};
