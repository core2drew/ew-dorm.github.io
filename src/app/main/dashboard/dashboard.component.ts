import { FloatLabel } from 'primeng/floatlabel';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { combineLatest, map, Observable } from 'rxjs';

import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { PushPipe } from '@ngrx/component';

import { MetaRepository } from '../../repositories/meta/meta.repository';
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
    ReactiveFormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DashboardService],
  standalone: true,
})
export class DashboardComponent implements OnInit {
  private dashboardService: DashboardService = inject(DashboardService);
  private metaRepo: MetaRepository = inject(MetaRepository);
  private userRepo: UserRepository = inject(UserRepository);
  private waterPriceSettingsRepo: WaterPriceSettingsRepository = inject(
    WaterPriceSettingsRepository,
  );
  private formBuilder: FormBuilder = inject(FormBuilder);
  basicData: any;
  chartOptions: any;
  availableMonths: any;
  availableYears: any;
  todayConsumption$: Observable<string | undefined> | undefined;
  weeklyConsumption$: Observable<string | undefined> | undefined;
  monthlyConsumption$: Observable<string | undefined> | undefined;
  latestPrice$: Observable<string | undefined> | undefined;
  usersCount$: Observable<number | undefined> | undefined;
  filterForm: FormGroup | undefined;

  ngOnInit() {
    this.waterPriceSettingsRepo.loadAllPrices();
    this.metaRepo.loadMetaData();

    this.todayConsumption$ = this.dashboardService.todayConsumption$;
    this.weeklyConsumption$ = this.dashboardService.weeklyConsumption$;
    this.monthlyConsumption$ = this.dashboardService.monthlyConsumption$;
    this.usersCount$ = this.userRepo.entities$.pipe(
      map((entities) => entities.length),
    );
    this.latestPrice$ = this.waterPriceSettingsRepo.entities$.pipe(
      map((prices) => prices.at(0)?.price.toFixed(2)),
    );

    this.filterForm = this.formBuilder.group({
      availableYears: new FormControl<number | null>(null),
    });

    combineLatest({
      allYearConsumption: this.dashboardService.allYearConsumption$,
      monthConsumption: this.dashboardService.monthConsumption$,
      availableYears: this.metaRepo.availableYears$,
      selectedMonth: this.dashboardService.selectedMonth$,
    }).subscribe(
      ({
        allYearConsumption,
        monthConsumption,
        availableYears,
        selectedMonth,
      }) => {
        const { labels, data } = selectedMonth
          ? (monthConsumption as DashboardData['monthConsumption'])
          : (allYearConsumption as DashboardData['allYearConsumption']);

        this.availableMonths = allYearConsumption?.labels.map((month) => ({
          name: month,
          code: month,
        }));

        this.availableYears = availableYears.map((month) => ({
          name: month,
          code: month,
        }));

        this.filterForm?.controls['availableYears'].setValue(
          this.availableYears.at(0),
        );

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
      },
    );
  }

  filterMonthHandler(e: SelectChangeEvent) {
    this.dashboardService.updateSelectedMonth(e.value.code);
  }

  clearFilterMonth() {
    this.dashboardService.updateSelectedMonth(null);
  }

  filterYearHandler(e: SelectChangeEvent) {
    this.dashboardService.updateSelectedYear(e.value.code);
  }
}
