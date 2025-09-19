import {
  Component,
  ViewChild,
  inject,
  computed,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

import { HeaderComponent } from '@src/app/layout/header/header.component';
import { SidebarComponent } from '@src/app/layout/sidebar/sidebar.component';
import { FooterComponent } from '@src/app/layout/footer/footer.component';
import { uiSignal } from '@signals/ui.signal';
import { themeSignal } from '@signals/theme.signal';
import { MaterialModule } from '@core/modules/material.module';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MaterialModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  private breakpointObserver = inject(BreakpointObserver);

  isHandset = this.breakpointObserver.isMatched('(max-width: 768px)');

  sidenavMode = computed(() => (this.isHandset ? 'over' : 'side'));
  sidenavOpened = computed(() =>
    this.isHandset ? false : uiSignal.sidebarOpen(),
  );
  isDarkMode = computed(() => themeSignal.isDarkMode());

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isHandset = this.breakpointObserver.isMatched('(max-width: 768px)');
  }

  toggleSidenav() {
    if (this.isHandset) {
      this.sidenav.toggle();
    } else {
      uiSignal.toggleSidebar();
    }
  }

  closeSidenav() {
    if (this.isHandset) {
      this.sidenav.close();
    }
  }
}
