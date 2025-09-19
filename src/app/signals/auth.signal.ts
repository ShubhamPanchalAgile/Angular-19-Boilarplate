import {
  Injectable,
  signal,
  inject,
  Injector,
  runInInjectionContext,
} from '@angular/core';
import { StorageService } from '@core/services/storage.service';
import { AuthState, initialState } from '@core/models/auth.interface';
import { User } from '@core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthSignal {
  private state = signal<AuthState>(initialState);
  private storage!: StorageService;

  constructor(private injector: Injector) {
    runInInjectionContext(this.injector, () => {
      this.storage = inject(StorageService);
      this.state.set(this.loadState());
    });
  }

  private saveState(state: AuthState) {
    this.storage.set('authState', JSON.stringify(state));
  }

  private loadState(): AuthState {
    const saved = this.storage.get<string>('authState');
    return saved ? JSON.parse(saved) : initialState;
  }

  user = () => this.state().user;
  token = () => this.state().token;
  isLoading = () => this.state().isLoading;
  isAuthenticated = () => !!this.state().user && !!this.state().token;

  login(user: User, token: string) {
    const newState: AuthState = { user, token, isLoading: false };
    this.state.set(newState);
    this.saveState(newState);
  }

  logout() {
    this.state.set(initialState);
    this.storage.remove('authState');
  }

  setLoading(isLoading: boolean) {
    this.state.update((state) => {
      const updated = { ...state, isLoading };
      this.saveState(updated);
      return updated;
    });
  }

  updateUser(user: Partial<User>) {
    this.state.update((state) => {
      const updated: AuthState = {
        ...state,
        user: state.user ? { ...state.user, ...user } : null,
      };
      this.saveState(updated);
      return updated;
    });
  }
}
