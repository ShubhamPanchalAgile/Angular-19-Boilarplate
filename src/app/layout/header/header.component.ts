import {
  Component,
  Output,
  EventEmitter,
  inject,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { themeSignal } from '../../signals/theme.signal';
import { MaterialModule } from '../../core/modules/material.module';
import { AuthSignal } from '../../signals/auth.signal';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  private authService = inject(AuthService);
  private authSignal = inject(AuthSignal);

  currentUser = computed(() => this.authSignal.user());
  isDarkMode = computed(() => themeSignal.isDarkMode());

  toggleTheme() {
    themeSignal.toggleDarkMode();
  }

  logout() {
    this.authService.logout();
  }
}
