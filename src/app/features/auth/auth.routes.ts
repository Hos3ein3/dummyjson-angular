import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { ForgetPassword } from './pages/forget-password/forget-password';
import { authGuard } from '@core/guards/auth.guard';

export const authRoutes: Routes = [
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'forget-password', component: ForgetPassword },
  //{ path: 'logout', component: , canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
