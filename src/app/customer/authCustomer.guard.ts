import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthCustomerService } from './_services/authCustomer.service';

export const authCustomerGuard: CanActivateFn = (route, state) => {
   const router=inject(Router);
   const authCustomerService=inject(AuthCustomerService);
  if(!authCustomerService.isLoggedIn()){
     router.navigate(['/login'],{queryParams:{returnUrl:state.url}});
     return false;
  }
  return true;
};
