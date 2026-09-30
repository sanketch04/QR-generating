import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const token = localStorage.getItem('accessToken');

  console.log('AUTH GUARD TOKEN:', token);

  if (!token) {
    console.log('NO TOKEN → REDIRECTING TO LOGIN');

    return router.createUrlTree(['/login']);
  }

  console.log('TOKEN FOUND → ALLOWING DASHBOARD');

  return true;
};
