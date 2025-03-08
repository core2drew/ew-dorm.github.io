import { Component } from '@angular/core';

import { AuthRepoService } from '../core/auth/auth-repo.service';
import { MetricCardComponent } from './components/metric-card/metric-card.component';

@Component({
  selector: 'ds-dashboard',
  imports: [MetricCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private authRepoService: AuthRepoService) {
    this.authRepoService.user$.subscribe((user) => console.log(user));
  }

  ngOnInit() {}
}
