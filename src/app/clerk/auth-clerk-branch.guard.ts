import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthClerkBranchService } from './_services/authClerk.service';

export const authClerkBranchGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
    const authClerkBranchService=inject(AuthClerkBranchService);
   if(!authClerkBranchService.isLoggedIn()){
      router.navigate(['/clerk/login']);
      return false;
   }
   return true;
};
