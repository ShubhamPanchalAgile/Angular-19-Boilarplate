import { signal } from '@angular/core';
import { ThemeMode, ThemeState } from '../core/models/common.interface';

const initialState: ThemeState = {
  mode: 'light',
  primaryColor: '#1976d2',
  accentColor: '#ff4081',
};

class ThemeSignal {
  private state = signal<ThemeState>(this.loadThemeFromStorage());

  mode = () => this.state().mode;
  primaryColor = () => this.state().primaryColor;
  accentColor = () => this.state().accentColor;
  isDarkMode = () => this.state().mode === 'dark';

  setMode(mode: ThemeMode) {
    this.state.update((state) => ({
      ...state,
      mode,
    }));
    this.saveThemeToStorage();
  }

  setPrimaryColor(color: string) {
    this.state.update((state) => ({
      ...state,
      primaryColor: color,
    }));
    this.saveThemeToStorage();
  }

  setAccentColor(color: string) {
    this.state.update((state) => ({
      ...state,
      accentColor: color,
    }));
    this.saveThemeToStorage();
  }

  toggleDarkMode() {
    const newMode = this.isDarkMode() ? 'light' : 'dark';
    this.setMode(newMode);
  }

  private loadThemeFromStorage(): ThemeState {
    try {
      const saved = localStorage.getItem('theme-settings');
      return saved ? { ...initialState, ...JSON.parse(saved) } : initialState;
    } catch {
      return initialState;
    }
  }

  private saveThemeToStorage() {
    localStorage.setItem('theme-settings', JSON.stringify(this.state()));
  }
}

export const themeSignal = new ThemeSignal();
