import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthSignal } from '@signals/auth.signal';

export const authGuard: CanActivateFn = (route, state) => {
  const authSignal = inject(AuthSignal);
  const router = inject(Router);

  if (authSignal.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
