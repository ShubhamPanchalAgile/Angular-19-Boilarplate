import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((c) => c.LoginComponent),
    data: { renderMode: 'prerender', defer: true },
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./layout/layout.component').then((c) => c.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent,
          ),
        data: { renderMode: 'client', defer: true },
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/users/users.component').then(
            (c) => c.UsersComponent,
          ),
        data: { renderMode: 'server', defer: true },
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products.component').then(
            (c) => c.ProductsComponent,
          ),
        data: { renderMode: 'server', defer: true },
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings.component').then(
            (c) => c.SettingsComponent,
          ),
        data: { renderMode: 'client', defer: true },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
