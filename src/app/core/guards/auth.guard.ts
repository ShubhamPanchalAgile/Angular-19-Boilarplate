import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { uiSignal } from '../../signals/ui.signal';
import { AuthSignal } from '../../signals/auth.signal';

export const authGuard: CanActivateFn = (route, state) => {
  const authSignal = inject(AuthSignal);
  const router = inject(Router);

  if (authSignal.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
