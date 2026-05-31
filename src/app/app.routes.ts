import { Routes } from '@angular/router';
import { LayoutShellComponent } from '../kits/layout-shell-kit/angular';

export const appRoutes: Routes = [
  {
    path: '',
    component: LayoutShellComponent,
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'ui-catalog',
    loadComponent: () => import('./pages/ui-catalog.component').then((m) => m.UiCatalogComponent),
  },
  { path: '**', redirectTo: 'dashboard' },
];