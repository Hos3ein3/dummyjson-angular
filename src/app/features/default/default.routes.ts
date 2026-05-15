import { Routes } from '@angular/router';
import { NotFound } from './not-found/not-found';
import { Unauthorized } from './unauthorized/unauthorized';
import { Maintenance } from './maintenance/maintenance';
import { ServerError } from './server-error/server-error';
import { errorPageGuard } from '@core/guards/error-page.guard';

export const DefaultRoutes: Routes = [
  { path: 'not-found', component: NotFound, canActivate: [errorPageGuard] },
  { path: 'server-error', component: ServerError, canActivate: [errorPageGuard] },
  { path: 'maintenance', component: Maintenance, canActivate: [errorPageGuard] },
  { path: 'unauthorized', component: Unauthorized, canActivate: [errorPageGuard] },
];
