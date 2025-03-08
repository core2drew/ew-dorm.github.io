import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { PopoverModule } from 'primeng/popover';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'ds-topmenu',
  imports: [
    PopoverModule,
    MenubarModule,
    AvatarModule,
    MenuModule,
    CommonModule,
  ],
  templateUrl: './topmenu.component.html',
  styleUrl: './topmenu.component.scss',
})
export class TopmenuComponent {
  userMenu: MenuItem[] | undefined;

  constructor(private authService: AuthService) {
    this.userMenu = [
      {
        label: 'Notifications',
        icon: 'pi pi-plus',
      },
      {
        label: 'Profile',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-cog',
          },
          {
            label: 'Messages',
            icon: 'pi pi-envelope',
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
