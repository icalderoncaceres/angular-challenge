import { CanActivateFn } from '@angular/router';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = localStorage.getItem('user') ? true : false;
  if (!isAuthenticated) {
    document.location.href = 'login';
  }
  return isAuthenticated;
};

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = localStorage.getItem('user') ? true : false;
  if (isAuthenticated) {
    document.location.href = '';
  }
  return !isAuthenticated;
};
