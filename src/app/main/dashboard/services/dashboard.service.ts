import {
  format,
  getMonth,
  isThisMonth,
  isThisWeek,
  isToday,
  toDate,
} from 'date-fns';
import { BehaviorSubject, combineLatest } from 'rxjs';

import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { WaterConsumptionRepository } from '../../../repositories/water-consumption/water-consumption.repository';
import { WaterConsumption } from '../../../shared/models/water-consumption.model';
import { DashboardData } from '../store/dashboard.model';

@UntilDestroy()
@Injectable()
export class DashboardService {
  todayConsumption$ = new BehaviorSubject<string | undefined>(undefined);
  weeklyConsumption$ = new BehaviorSubject<string | undefined>(undefined);
  monthlyConsumption$ = new BehaviorSubject<string | undefined>(undefined);
  allYearConsumption$ = new BehaviorSubject<
    DashboardData['allYearConsumption'] | null
  >(null);
  private monthConsumptionSubject$ = new BehaviorSubject<
    DashboardData['monthConsumption'] | null
  >(null);
  monthConsumption$ = this.monthConsumptionSubject$.asObservable();

  private selectedMonthSubject$ = new BehaviorSubject<string | null>(null);
  selectedMonth$ = this.selectedMonthSubject$.asObservable();

  private selectedYearSubject$ = new BehaviorSubject<number>(
    new Date().getFullYear(),
  );
  selectedYear$ = this.selectedYearSubject$.asObservable();

  private selectedTenantSubject$ = new BehaviorSubject<string | null>(null);
  selectedTenant$ = this.selectedTenantSubject$.asObservable();

  updateSelectedMonth(month: string | null) {
    this.selectedMonthSubject$.next(month);
  }

  updateSelectedYear(year: number) {
    this.selectedYearSubject$.next(year);
  }

  updateSelectedTenant(id: string | null) {
    this.selectedTenantSubject$.next(id);
  }

  private monthNameToIndex = (monthName: string) =>
    new Date(`${monthName} 1, 2000`).getMonth();

  private generateBarChartData(data: WaterConsumption[]) {
    const groupedData = Object.groupBy(data, (item) => {
      const [month, , year] = format(item.timestamp, 'MM/dd/y')!.split('/');
      return `${year}-${month}`;
    }) as Record<string, WaterConsumption[]>;

    const summedData = Object.keys(groupedData).reduce(
      (acc, cur) => {
        const date = toDate(new Date(cur));
        const monthName = format(date, 'MMMM');

        const monthConsumption = groupedData[cur].reduce(
          (_acc, _cur) => (_acc += _cur['consumption']),
          0,
        );
        return {
          labels: [...acc['labels'], monthName],
          data: [...acc['data'], monthConsumption],
        };
      },
      {
        labels: [] as string[],
        data: [] as number[],
      },
    );

    return summedData;
  }

  private generateMonthBarChartData(
    data: WaterConsumption[],
    selectedMonth: string,
  ) {
    const monthIndex = this.monthNameToIndex(selectedMonth);
    const filteredData = data.filter((item) => {
      const date = new Date(item.timestamp);
      return getMonth(date) === monthIndex;
    });
    const groupedData = Object.groupBy(filteredData, (item) => {
      const [month, date, year] = format(item.timestamp, 'MMM/dd')!.split('/');
      return `${month}-${date}`;
    }) as Record<string, WaterConsumption[]>;

    const summedData = Object.keys(groupedData).reduce(
      (acc, cur) => {
        const monthConsumption = groupedData[cur].reduce(
          (_acc, _cur) => (_acc += _cur['consumption']),
          0,
        );
        return {
          labels: [...acc['labels'], cur],
          data: [...acc['data'], monthConsumption],
        };
      },
      {
        labels: [] as string[],
        data: [] as number[],
      },
    );
    return summedData;
  }

  private getTodayConsumption(consumptions: WaterConsumption[]) {
    return consumptions.reduce((acc, cur) => {
      const { timestamp } = cur;
      if (isToday(timestamp)) {
        return (acc += cur.consumption);
      }
      return acc;
    }, 0);
  }

  private getWeeklyConsumption(consumptions: WaterConsumption[]) {
    return consumptions
      .filter(({ timestamp }) => isThisWeek(timestamp, { weekStartsOn: 1 }))
      .reduce((acc, cur) => {
        return (acc += cur.consumption);
      }, 0);
  }

  private getMonthlyConsumption(consumptions: WaterConsumption[]) {
    return consumptions
      .filter(({ timestamp }) => isThisMonth(timestamp))
      .reduce((acc, cur) => {
        return (acc += cur.consumption);
      }, 0);
  }

  constructor(private waterConsumptionRepo: WaterConsumptionRepository) {
    combineLatest({
      waterConsumption: this.waterConsumptionRepo.entities$,
      selectedMonth: this.selectedMonth$,
    })
      .pipe(untilDestroyed(this))
      .subscribe(({ waterConsumption, selectedMonth }) => {
        console.log(waterConsumption);
        this.todayConsumption$.next(
          this.getTodayConsumption(waterConsumption).toFixed(2),
        );
        this.weeklyConsumption$.next(
          this.getWeeklyConsumption(waterConsumption).toFixed(2),
        );
        this.monthlyConsumption$.next(
          this.getMonthlyConsumption(waterConsumption).toFixed(2),
        );
        this.allYearConsumption$.next(
          this.generateBarChartData(waterConsumption),
        );
        if (selectedMonth) {
          this.monthConsumptionSubject$.next(
            this.generateMonthBarChartData(waterConsumption, selectedMonth),
          );
        }
      });
  }
}
