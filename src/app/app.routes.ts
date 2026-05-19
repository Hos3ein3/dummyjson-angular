import { Routes } from '@angular/router';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { authGuard } from '@core/guards/auth.guard';
import { errorPageGuard } from '@core/guards/error-page.guard';
import { NotFound } from './features/default/not-found/not-found';
import { ServerError } from './features/default/server-error/server-error';
import { Maintenance } from './features/default/maintenance/maintenance';
import { Unauthorized } from './features/default/unauthorized/unauthorized';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/public/public.routes').then((x) => x.publicRoutes),
      },
      {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then((x) => x.authRoutes),
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardLayout,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then((x) => x.dashboardRoutes),
  },

  { path: 'not-found', component: NotFound, canActivate: [errorPageGuard] },
  { path: 'server-error', component: ServerError, canActivate: [errorPageGuard] },
  { path: 'maintenance', component: Maintenance, canActivate: [errorPageGuard] },
  { path: 'unauthorized', component: Unauthorized, canActivate: [errorPageGuard] },

  { path: '**', redirectTo: 'not-found' },
];
