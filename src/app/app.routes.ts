import { Routes } from '@angular/router';
import { PublicLayout } from './layouts/public-layout/public-layout';

export const routes: Routes = [{
  path:'',
  component:PublicLayout,
  loadChildren:() => import('./features/public/public.routes')
    .then(x=>x.publicRoutes)
}];
