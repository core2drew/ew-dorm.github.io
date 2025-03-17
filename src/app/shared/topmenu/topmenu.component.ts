import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { PopoverModule } from 'primeng/popover';
import { RippleModule } from 'primeng/ripple';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTE_PATH } from '../../enums/route-paths';
import { AuthService } from '../../services/auth/auth.service';
import { MessagesDrawerComponent } from '../messages-drawer/messages-drawer.component';

@Component({
  selector: 'ds-topmenu',
  imports: [
    PopoverModule,
    MenubarModule,
    AvatarModule,
    MenuModule,
    DrawerModule,
    MessagesDrawerComponent,
    RippleModule,
    CommonModule,
  ],
  templateUrl: './topmenu.component.html',
  styleUrl: './topmenu.component.scss',
})
export class TopmenuComponent {
  isMessageDrawerVisiblie = false;
  userMenu: MenuItem[] | undefined;
  items: MenuItem[] | undefined;

  constructor(private authService: AuthService, private router: Router) {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-gauge',
        command: () => {
          this.router.navigate([ROUTE_PATH.DASHBOARD]);
        },
      },
      {
        label: 'Reports',
        icon: 'pi pi-chart-line',
        command: () => {
          this.router.navigate([ROUTE_PATH.REPORTS]);
        },
      },
      {
        label: 'Payment History',
        icon: 'pi pi-chart-line',
        command: () => {
          this.router.navigate([ROUTE_PATH.PAYMENT_HISTORY]);
        },
      },
    ];

    this.userMenu = [
      {
        label: 'Notifications',
        icon: 'pi pi-plus',
        items: [
          {
            label: 'Messages',
            icon: 'pi pi-envelope',
            command: () => {
              this.isMessageDrawerVisiblie = !this.isMessageDrawerVisiblie;
            },
          },
        ],
      },
      {
        label: 'Profile',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-cog',
          },

          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
              this.authService.signOut();
            },
          },
        ],
      },
    ];
  }
}
