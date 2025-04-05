import {
  format,
  isThisMonth,
  isThisWeek,
  isThisYear,
  isToday,
  toDate,
} from 'date-fns';
import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { WaterConsumptionRepository } from '../../../repositories/water-consumption/water-consumption.repository';
import { WaterConsumption } from '../../../shared/models/water-consumption.model';
import { DashboardData } from '../store/dashboard.model';

@UntilDestroy()
@Injectable()
export class DashboardService {
  todayConsumption$ = new BehaviorSubject<number | undefined>(undefined);
  weeklyConsumption$ = new BehaviorSubject<number | undefined>(undefined);
  monthlyConsumption$ = new BehaviorSubject<number | undefined>(undefined);
  allMonthsConsumption$ = new BehaviorSubject<
    DashboardData['allYearConsumption'] | null
  >(null);

  private generateBarChartData(data: WaterConsumption[]) {
    const groupedData = Object.groupBy(data, (item) => {
      const [month, , year] = format(item.timestamp, 'MM/dd/y')!.split('/');
      return `${year}-${month}`;
    }) as Record<string, WaterConsumption[]>;

    const summedData = Object.keys(groupedData).reduce(
      (acc, cur) => {
        const date = toDate(new Date(cur));
        const monthName = format(date, 'MMMM');
        const year = format(date, 'y');
        const monthLabel = isThisYear(date)
          ? monthName
          : `${monthName} (${year})`;

        const monthConsumption = groupedData[cur].reduce(
          (_acc, _cur) => (_acc += _cur['consumption']),
          0,
        );
        return {
          monthLabels: [...acc['monthLabels'], monthLabel],
          data: [...acc['data'], monthConsumption],
        };
      },
      {
        monthLabels: [] as string[],
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
    this.waterConsumptionRepo.entities$
      .pipe(untilDestroyed(this))
      .subscribe((consumptions) => {
        this.todayConsumption$.next(this.getTodayConsumption(consumptions));
        this.weeklyConsumption$.next(this.getWeeklyConsumption(consumptions));
        this.monthlyConsumption$.next(this.getMonthlyConsumption(consumptions));
        this.allMonthsConsumption$.next(
          this.generateBarChartData(consumptions),
        );
      });
  }
}
