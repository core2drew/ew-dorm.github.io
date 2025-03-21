import { Observable } from 'rxjs';

import { Component, inject, OnInit } from '@angular/core';
import { PushPipe } from '@ngrx/component';

import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { MetricCardComponent } from './components/metric-card/metric-card.component';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'ds-dashboard',
  imports: [MetricCardComponent, BarChartComponent, PushPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DashboardService],
  standalone: true,
})
export class DashboardComponent implements OnInit {
  private dashboardService: DashboardService = inject(DashboardService);
  basicData: any;
  todayConsumption$: Observable<number | undefined> | undefined;
  weeklyConsumption$: Observable<number | undefined> | undefined;
  monthlyConsumption$: Observable<number | undefined> | undefined;
  allMonthsConsumption = this.dashboardService.allMonthsConsumption;

  ngOnInit() {
    this.todayConsumption$ = this.dashboardService.todayConsumption$;
    this.weeklyConsumption$ = this.dashboardService.weeklyConsumption$;
    this.monthlyConsumption$ = this.dashboardService.monthlyConsumption$;

    console.log(this.allMonthsConsumption());
    this.basicData = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
      ],
      datasets: [
        {
          label: 'Water Consumption (m3)',
          data: Array.from(
            { length: 5 },
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
