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
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Sales',
          data: [540, 325, 702, 620],
          backgroundColor: [
            'rgba(249, 115, 22, 0.2)',
            'rgba(6, 182, 212, 0.2)',
            'rgb(107, 114, 128, 0.2)',
            'rgba(139, 92, 246, 0.2)',
          ],
          borderColor: [
            'rgb(249, 115, 22)',
            'rgb(6, 182, 212)',
            'rgb(107, 114, 128)',
            'rgb(139, 92, 246)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }
}
