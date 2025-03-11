import { Component } from '@angular/core';

import { AuthRepoService } from '../core/auth/auth-repo.service';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { MetricCardComponent } from './components/metric-card/metric-card.component';

@Component({
  selector: 'ds-dashboard',
  imports: [MetricCardComponent, BarChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  basicData: any;
  constructor(private authRepoService: AuthRepoService) {
    this.authRepoService.user$.subscribe((user) => console.log(user));
  }

  ngOnInit() {
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Water Consumption (Liters)',
          data: Array.from(
            { length: 30 },
            () => Math.floor(Math.random() * (200 - 100 + 1)) + 100,
          ), // Random consumption between 100-200L
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  }
}
