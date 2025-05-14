import { FloatLabel } from 'primeng/floatlabel';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { combineLatest, map, Observable } from 'rxjs';

import { Component, inject, OnInit } from '@angular/core';
import { PushPipe } from '@ngrx/component';

import { UserRepository } from '../../repositories/user/user.repository';
import { WaterPriceSettingsRepository } from '../system-settings/water-price-settings/store/water-price-settings.repository';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { MetricCardComponent } from './components/metric-card/metric-card.component';
import { DashboardService } from './services/dashboard.service';
import { DashboardData } from './store/dashboard.model';

@Component({
  selector: 'ds-dashboard',
  imports: [
    MetricCardComponent,
    BarChartComponent,
    PushPipe,
    SelectModule,
    FloatLabel,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DashboardService],
  standalone: true,
})
export class DashboardComponent implements OnInit {
  private dashboardService: DashboardService = inject(DashboardService);
  private userRepo: UserRepository = inject(UserRepository);
  private waterPriceSettingsRepo: WaterPriceSettingsRepository = inject(
    WaterPriceSettingsRepository,
  );
  basicData: any;
  chartOptions: any;
  availableMonths: any;
  todayConsumption$: Observable<string | undefined> | undefined;
  weeklyConsumption$: Observable<string | undefined> | undefined;
  monthlyConsumption$: Observable<string | undefined> | undefined;
  latestPrice$: Observable<string | undefined> | undefined;
  usersCount$: Observable<number | undefined> | undefined;

  ngOnInit() {
    this.waterPriceSettingsRepo.loadAllPrices();

    this.todayConsumption$ = this.dashboardService.todayConsumption$;
    this.weeklyConsumption$ = this.dashboardService.weeklyConsumption$;
    this.monthlyConsumption$ = this.dashboardService.monthlyConsumption$;
    this.usersCount$ = this.userRepo.entities$.pipe(
      map((entities) => entities.length),
    );
    this.latestPrice$ = this.waterPriceSettingsRepo.entities$.pipe(
      map((prices) => prices.at(0)?.price.toFixed(2)),
    );

    combineLatest({
      allConsumption: this.dashboardService.allMonthsConsumption$,
      monthConsumption: this.dashboardService.monthConsumption$,
      selectedMonth: this.dashboardService.selectedMonth$,
    }).subscribe(({ allConsumption, monthConsumption, selectedMonth }) => {
      const { labels, data } = selectedMonth
        ? (monthConsumption as DashboardData['monthConsumption'])
        : (allConsumption as DashboardData['allYearConsumption']);
      this.availableMonths = allConsumption?.labels.map((month) => ({
        name: month,
        code: month,
      }));

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

  filterMonthHandler(e: SelectChangeEvent) {
    this.dashboardService.updateSelectedMonth(e.value.code);
  }

  clearFilterMonth() {
    this.dashboardService.updateSelectedMonth(null);
  }
}
