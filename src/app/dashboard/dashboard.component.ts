import { ButtonModule } from 'primeng/button';

import { Component } from '@angular/core';

import { AuthRepoService } from '../core/auth/auth-repo.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'ds-dashboard',
  imports: [ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(
    private authService: AuthService,
    private authRepoService: AuthRepoService,
  ) {
    this.authRepoService.user$.subscribe((user) => console.log(user));
  }

  signOut() {
    this.authService.signOut();
  }
}
