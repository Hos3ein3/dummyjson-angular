import { Routes } from '@angular/router';
import { PublicLayout } from './layouts/public-layout/public-layout';

export const routes: Routes = [{
  path:'',
  component:PublicLayout,
  loadChildren:() => import('./features/public/public.routes')
    .then(x=>x.publicRoutes)
},
  {
    path:'auth',
    component:PublicLayout,
    loadChildren:() =>import('./features/auth/auth.routes')
      .then(x=>x.authRoutes)
  }];
