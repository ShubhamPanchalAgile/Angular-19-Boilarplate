import {
  ErrorHandler,
  Injectable,
  inject,
  Provider,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { uiSignal } from '../../signals/ui.signal';
import { StorageService } from './storage.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private platformId = inject(PLATFORM_ID);
  private storageService = inject(StorageService);

  handleError(error: any): void {
    console.error('Global error caught:', error);

    let errorMessage = 'An unexpected error occurred';
    let errorTitle = 'Application Error';

    if (error?.message) {
      errorMessage = error.message;
    } else if (error?.error?.message) {
      errorMessage = error.error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    if (
      error?.name === 'ChunkLoadError' ||
      errorMessage.includes('Loading chunk')
    ) {
      errorTitle = 'Resource Loading Error';
      errorMessage =
        'Failed to load application resources. Please refresh the page.';
    } else if (error?.name === 'NetworkError') {
      errorTitle = 'Network Error';
      errorMessage = 'Network connection issue. Please check your connection.';
    } else if (error?.rejection?.name === 'NavigationError') {
      errorTitle = 'Navigation Error';
      errorMessage = 'Failed to navigate. Please try again.';
    }

    uiSignal.showNotification({
      message: 'errorMessage',
      type: 'error',
    });

    if (isPlatformBrowser(this.platformId)) {
      if (
        typeof window !== 'undefined' &&
        window.location.hostname !== 'localhost'
      ) {
        this.logToExternalService(error, errorMessage);
      }
    }
  }

  private logToExternalService(error: any, message: string): void {
    try {
      const errorData = {
        message,
        stack: error?.stack,
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userId: this.storageService.get('auth_user')
          ? JSON.parse(this.storageService.get('auth_user')!).id
          : null,
      };

      // Replace with logging service
      console.log('Would log to external service:', errorData);
    } catch (loggingError) {
      console.error('Failed to log error to external service:', loggingError);
    }
  }
}

export const globalErrorHandler: Provider = {
  provide: ErrorHandler,
  useClass: GlobalErrorHandler,
};
