import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthRepoService } from '../core/auth/auth-repo.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'ds-dashboard',
  imports: [
    RouterOutlet,
    ButtonModule,
    DrawerModule,
    MenubarModule,
    AvatarModule,
    MenuModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  isDrawerVisible = false;
  items: MenuItem[] | undefined;

  constructor(
    private authService: AuthService,
    private authRepoService: AuthRepoService,
  ) {
    this.authRepoService.user$.subscribe((user) => console.log(user));
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
      },
      {
        label: 'Projects',
        icon: 'pi pi-search',
        badge: '3',
        items: [
          {
            label: 'Core',
            icon: 'pi pi-bolt',
            shortcut: '⌘+S',
          },
          {
            label: 'Blocks',
            icon: 'pi pi-server',
            shortcut: '⌘+B',
          },
          {
            separator: true,
          },
          {
            label: 'UI Kit',
            icon: 'pi pi-pencil',
            shortcut: '⌘+U',
          },
        ],
      },
    ];
  }

  signOut() {
    this.authService.signOut();
  }
}
