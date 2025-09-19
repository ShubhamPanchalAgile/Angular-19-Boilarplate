import {
  Component,
  Output,
  EventEmitter,
  inject,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '@core/modules/material.module';
import { NavItem } from '@core/models/nav.interface';
import { menuItem } from '@core/config/_nav';
import { AuthSignal } from '@signals/auth.signal';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output() closeSidenav = new EventEmitter<void>();

  private router = inject(Router);
  private authSignal = inject(AuthSignal);

  currentUser = computed(() => this.authSignal.user());

  navItems: NavItem[] = menuItem();

  onNavItemClick() {
    this.closeSidenav.emit();
  }
}
