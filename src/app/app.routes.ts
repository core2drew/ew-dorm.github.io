import { Routes } from '@angular/router';

import { ROUTE_PATH } from './enums/route-paths';
import { authGuard } from './guards/auth/auth.guard';
import { unauthGuard } from './guards/unauth/unauth.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PaymentsHistoryComponent } from './pages/payments-history/payments-history.component';
import { ReportsComponent } from './pages/reports/reports.component';

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
    path: 'reports',
    component: ReportsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'payments-history',
    component: PaymentsHistoryComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: ROUTE_PATH.DASHBOARD,
    pathMatch: 'full',
  },
];
