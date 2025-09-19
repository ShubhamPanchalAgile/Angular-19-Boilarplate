export interface UIState {
  sidebarOpen: boolean;
  sidebarMode: 'over' | 'side';
  loading: boolean;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  timestamp: number;
}
