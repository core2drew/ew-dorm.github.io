import { Routes } from '@angular/router';

import { ROUTE_PATH } from './enums/route-paths';
import { adminRoleGuard } from './guards/admin-role/admin-role.guard';
import { authGuard } from './guards/auth/auth.guard';
import { unauthGuard } from './guards/unauth/unauth.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { MessagesComponent } from './main/messages/messages.component';
import { PaymentsHistoryComponent } from './main/payments-history/payments-history.component';
import { ReportsComponent } from './main/reports/reports.component';
import { SystemSettingsComponent } from './main/system-settings/system-settings.component';
import { userResolver } from './main/user.resolver';
import { UsersComponent } from './main/users/users.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [unauthGuard],
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    resolve: {
      main: userResolver,
    },
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
      {
        path: 'payments-history',
        component: PaymentsHistoryComponent,
        canActivate: [adminRoleGuard],
      },
      {
        path: 'messages',
        component: MessagesComponent,
        canActivate: [adminRoleGuard],
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [adminRoleGuard],
      },
      {
        path: 'system-settings',
        component: SystemSettingsComponent,
        canActivate: [adminRoleGuard],
      },
      {
        path: '',
        redirectTo: ROUTE_PATH.DASHBOARD,
        pathMatch: 'full',
      },
    ],
  },
];
