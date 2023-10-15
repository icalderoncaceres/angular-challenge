import { inject } from '@angular/core';
import { CanActivateFn, UrlSegment } from '@angular/router';
import { Router } from '@angular/router';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = localStorage.getItem('user') ? true : false;
  if (!isAuthenticated) {
    const router: Router = inject(Router);
    router.navigate(['/login']);
  }

  return isAuthenticated;
};

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = localStorage.getItem('user') ? true : false;

  if (isAuthenticated) {
    const router: Router = inject(Router);
    router.navigate(['/']);
  }
  
  return !isAuthenticated;
};
