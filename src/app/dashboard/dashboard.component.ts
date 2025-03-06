import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'ds-dashboard',
  imports: [ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  signOut() {
    this.authService.signOut();
  }
}
