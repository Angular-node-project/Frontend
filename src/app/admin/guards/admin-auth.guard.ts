import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const adminAuthGuard = () => {
  const router = inject(Router);
  const token = localStorage.getItem('adminToken');
  
  if (!token) {
    router.navigate(['/admin/login']);
    return false;
  }
  
  return true;
}; 