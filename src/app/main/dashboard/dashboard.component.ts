import { Component, OnInit } from '@angular/core';

import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { MetricCardComponent } from './components/metric-card/metric-card.component';
import { DashboardService } from './services/dashboard.service';
import { DashboardRepository } from './store/dashboard.repository';

@Component({
  selector: 'ds-dashboard',
  imports: [MetricCardComponent, BarChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DashboardService, DashboardRepository],
  standalone: true,
})
export class DashboardComponent implements OnInit {
  basicData: any;

  constructor() {}

  ngOnInit() {
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Water Consumption (m3)',
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
