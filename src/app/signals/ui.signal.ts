import { signal } from '@angular/core';
import { Notification, UIState } from '@core/models/ui.interface';

const initialState: UIState = {
  sidebarOpen: true,
  sidebarMode: 'side',
  loading: false,
  notifications: [],
};

class UISignal {
  private state = signal<UIState>(initialState);

  sidebarOpen = () => this.state().sidebarOpen;
  sidebarMode = () => this.state().sidebarMode;
  loading = () => this.state().loading;
  notifications = () => this.state().notifications;

  toggleSidebar() {
    this.state.update((state) => ({
      ...state,
      sidebarOpen: !state.sidebarOpen,
    }));
  }

  setSidebarOpen(open: boolean) {
    this.state.update((state) => ({
      ...state,
      sidebarOpen: open,
    }));
  }

  setSidebarMode(mode: 'over' | 'side') {
    this.state.update((state) => ({
      ...state,
      sidebarMode: mode,
    }));
  }

  setLoading(loading: boolean) {
    this.state.update((state) => ({
      ...state,
      loading,
    }));
  }

  showNotification(notification: Omit<Notification, 'id' | 'timestamp'>) {
    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };

    this.state.update((state) => ({
      ...state,
      notifications: [...state.notifications, newNotification],
    }));
  }

  removeNotification(id: string) {
    this.state.update((state) => ({
      ...state,
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  }
}

export const uiSignal = new UISignal();
