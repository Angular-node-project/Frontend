import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const sellerAuthGuard = () => {
  const router = inject(Router);
  const token = localStorage.getItem('sellerToken');
  

  if (!token) {
    router.navigate(['/seller/login']);
    return false;
  }
  
  return true;
}; 