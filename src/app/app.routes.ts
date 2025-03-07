import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ROUTE_PATH } from './enums/route-paths';
import { authGuard } from './guards/auth/auth.guard';
import { unauthGuard } from './guards/unauth/unauth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [unauthGuard],
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: ROUTE_PATH.DASHBOARD,
    pathMatch: 'full',
  },
];
