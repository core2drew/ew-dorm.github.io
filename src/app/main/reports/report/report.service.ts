import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { WaterConsumption } from '../../../stores/water-consumption/water-consumption.model';
import { WaterConsumptionRepository } from '../../../stores/water-consumption/water-consumption.repository';

@UntilDestroy()
@Injectable()
export class ReportService {
  private dataSubject = new BehaviorSubject<Array<WaterConsumption> | null>(
    null,
  );
  public data$ = this.dataSubject.asObservable();

  constructor(private waterConsumptionRepo: WaterConsumptionRepository) {
    this.waterConsumptionRepo.entities$
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        this.dataSubject.next(data);
      });
  }

  // async filterByDate(dates: Date[]) {
  //   const q = query(
  //     where('timestamp', '>=', Timestamp.fromDate(dates[0])),
  //     where('timestamp', '<=', Timestamp.fromDate(dates[1])),
  //     where('uid', '==', this.uid),
  //   );
  // }
}
