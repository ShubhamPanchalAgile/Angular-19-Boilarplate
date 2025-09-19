import { effect, inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { uiSignal } from '@signals/ui.signal';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  constructor() {
    effect(() => {
      const notifications = uiSignal.notifications();

      if (notifications.length > 0) {
        const latest = notifications[notifications.length - 1];

        this.snackBar.open(latest.message, 'Close', {
          duration: 3000, // this controls snackbar auto-dismiss
          panelClass: [`toast-${latest.type}`],
        });

        // remove from signal *after* snackbar closes
        setTimeout(() => uiSignal.removeNotification(latest.id), 3000);
      }
    });
  }

  success(message: string) {
    uiSignal.showNotification({ message, type: 'success' });
  }

  error(message: string) {
    uiSignal.showNotification({ message, type: 'error' });
  }

  info(message: string) {
    uiSignal.showNotification({ message, type: 'info' });
  }
}
