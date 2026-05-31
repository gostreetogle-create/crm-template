import { Routes } from '@angular/router';
import { LayoutShellComponent } from '../kits/layout-shell-kit/angular';

export const appRoutes: Routes = [
  {
    path: '',
    component: LayoutShellComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'ui-catalog',
        loadComponent: () => import('./pages/ui-catalog.component').then((m) => m.UiCatalogComponent),
      },
      {
        path: 'demo/tag',
        loadComponent: () => import('./demos/tag-demo.component').then((m) => m.TagDemoComponent),
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];