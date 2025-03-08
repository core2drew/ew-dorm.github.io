import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthRepoService } from '../core/auth/auth-repo.service';
import { SidemenuComponent } from '../shared/sidemenu/sidemenu.component';
import { TopmenuComponent } from '../shared/topmenu/topmenu.component';

@Component({
  selector: 'ds-dashboard',
  imports: [
    RouterOutlet,
    ButtonModule,
    DrawerModule,
    MenuModule,
    CommonModule,
    TopmenuComponent,
    SidemenuComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  isDrawerVisible = false;

  constructor(private authRepoService: AuthRepoService) {
    this.authRepoService.user$.subscribe((user) => console.log(user));
  }

  ngOnInit() {}
}
