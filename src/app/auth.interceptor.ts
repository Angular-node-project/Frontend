import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './_services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  let userType: 'customer' | 'seller' | 'admin'|'clerkBranch' | null = null;

  if (req.url.includes('api/customer')) {
    userType = 'customer';

  } else if (req.url.includes('api/seller')) {
    userType = 'seller';
  } else if (req.url.includes('api/admin')) {
    userType = 'admin';
  } else if (req.url.includes('api/clerkBranch')) {
    userType = 'clerkBranch';
  }

  if (userType) {
    const token = authService.getToken(userType);
    if (token) {
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      })
      return next(authRequest);
    }
  }
  return next(req);
};
