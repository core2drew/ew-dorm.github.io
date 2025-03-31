import { Routes } from '@angular/router';

import { ROUTE_PATH } from './enums/route-paths';
import { authGuard } from './guards/auth/auth.guard';
import { unauthGuard } from './guards/unauth/unauth.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { MessagesComponent } from './main/messages/messages.component';
import { PaymentsHistoryComponent } from './main/payments-history/payments-history.component';
import { ReportsComponent } from './main/reports/reports.component';
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
      },
      {
        path: 'messages',
        component: MessagesComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: '',
        redirectTo: ROUTE_PATH.DASHBOARD,
        pathMatch: 'full',
      },
    ],
  },
];
