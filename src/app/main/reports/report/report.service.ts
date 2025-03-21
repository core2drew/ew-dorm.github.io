import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { WaterConsumptionRepository } from '../../../repositories/water-consumption/water-consumption.repository';
import { WaterConsumption } from '../../../shared/models/water-consumption.model';

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
