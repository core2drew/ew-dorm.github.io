import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { Menubar, MenubarModule } from 'primeng/menubar';
import { PopoverModule } from 'primeng/popover';
import { RippleModule } from 'primeng/ripple';

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { AuthRepoService } from '../../core/auth/auth-repo.service';
import { ROLES } from '../../enums/roles';
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
    Menubar,
  ],
  templateUrl: './topmenu.component.html',
  styleUrl: './topmenu.component.scss',
})
export class TopmenuComponent {
  isMessageDrawerVisiblie = false;
  userMenu: MenuItem[] | undefined;
  items: MenuItem[] | undefined;
  protected authRepo = inject(AuthRepoService);
  readonly currentUser = toSignal(this.authRepo.user$);

  constructor(private authService: AuthService, private router: Router) {
    const isAdmin = this.currentUser()?.role == ROLES.ADMIN;

    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-gauge',
        command: () => {
          this.router.navigate([ROUTE_PATH.DASHBOARD]);
        },
      },
      {
        label: 'Daily Reports',
        icon: 'pi pi-chart-line',
        command: () => {
          this.router.navigate([ROUTE_PATH.REPORTS]);
        },
      },
      {
        label: 'Payments',
        icon: 'pi pi-calculator',
        command: () => {
          this.router.navigate([ROUTE_PATH.PAYMENT_HISTORY]);
        },
        visible: isAdmin,
      },
      {
        label: 'Messages',
        icon: 'pi pi-envelope',
        command: () => {
          this.router.navigate([ROUTE_PATH.MESSAGES]);
        },
        visible: isAdmin,
      },
      {
        label: 'Users',
        icon: 'pi pi-users',
        command: () => {
          this.router.navigate([ROUTE_PATH.USERS]);
        },
        visible: isAdmin,
      },
      {
        label: 'System settings',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Water price settings',
            icon: '',
            command: () => {
              this.router.navigate([ROUTE_PATH.WATER_PRICE_SETTINGS]);
            },
          },
          {
            label: 'Room settings',
            icon: '',
            command: () => {
              this.router.navigate([ROUTE_PATH.ROOM_SETTINGS]);
            },
          },
        ],
        visible: isAdmin,
      },
    ];

    this.userMenu = [
      {
        label: 'Notifications',
        visible: !isAdmin,
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
