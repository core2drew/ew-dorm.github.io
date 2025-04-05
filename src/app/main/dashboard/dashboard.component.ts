import { map, Observable } from 'rxjs';

import { Component, inject, OnInit } from '@angular/core';
import { PushPipe } from '@ngrx/component';

import { WaterPriceSettingsRepository } from '../system-settings/water-price-settings/store/water-price-settings.repository';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { MetricCardComponent } from './components/metric-card/metric-card.component';
import { DashboardService } from './services/dashboard.service';
import { DashboardData } from './store/dashboard.model';

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
  private waterPriceSettingsRepo: WaterPriceSettingsRepository = inject(
    WaterPriceSettingsRepository,
  );
  basicData: any;
  todayConsumption$: Observable<number | undefined> | undefined;
  weeklyConsumption$: Observable<number | undefined> | undefined;
  monthlyConsumption$: Observable<number | undefined> | undefined;
  latestPrice$: Observable<number | undefined> | undefined;

  ngOnInit() {
    this.waterPriceSettingsRepo.loadAllPrices();

    this.todayConsumption$ = this.dashboardService.todayConsumption$;
    this.weeklyConsumption$ = this.dashboardService.weeklyConsumption$;
    this.monthlyConsumption$ = this.dashboardService.monthlyConsumption$;
    this.latestPrice$ = this.waterPriceSettingsRepo.entities$.pipe(
      map((prices) => prices.at(0)?.price),
    );

    this.dashboardService.allMonthsConsumption$.subscribe((monthData) => {
      const { monthLabels: labels, data } =
        monthData as DashboardData['allYearConsumption'];
      this.basicData = {
        labels,
        datasets: [
          {
            label: 'Water Consumption (m3)',
            data,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
    });
  }
}
