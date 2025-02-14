import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthSellerService } from './_services/authSeller.service';

export const authSellerGuard: CanActivateFn = (route, state) => {
    const router=inject(Router);
      const authSellerService=inject(AuthSellerService);
     if(!authSellerService.isLoggedIn()){
        router.navigate(['/seller/login']);
        return false;
     }
     return true;
};
