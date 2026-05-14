import { Routes } from '@angular/router';
import { NotFound } from './not-found/not-found';
import { Unauthorized } from './unauthorized/unauthorized';
import { Maintenance } from './maintenance/maintenance';
import { ServerError } from './server-error/server-error';

export const DefaultRoutes: Routes = [
  { path: 'not-found', component: NotFound },
  { path: 'server-error', component: ServerError},
  { path: 'maintenance', component: Maintenance },
  { path: 'unauthorized', component: Unauthorized },
];
