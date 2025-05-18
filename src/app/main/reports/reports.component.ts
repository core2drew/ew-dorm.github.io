import * as fns from 'date-fns';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { filter, map, Observable, of } from 'rxjs';

import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { PushPipe } from '@ngrx/component';

import { ReportRepository } from '../../repositories/report/report.repository';
import { Report } from '../../shared/models/report.model';
import { ReportTableComponent } from './components/report-table/report-table.component';

@UntilDestroy()
@Component({
  selector: 'ds-reports',
  imports: [
    ReportTableComponent,
    DatePickerModule,
    ReactiveFormsModule,
    FloatLabelModule,
    PushPipe,
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {
  dataSource$: Observable<Report[]> = of([]);
  dateRangeControl = new FormControl<Date[]>([]);

  constructor(private reportRepo: ReportRepository) {}

  ngOnInit() {
    this.reportRepo.getReport();
    this.dataSource$ = this.reportRepo.data$.pipe(
      map((reports) => {
        return reports.sort((a, b) => {
          const timestampA = fns.getUnixTime(new Date(a.date));
          const timestampB = fns.getUnixTime(new Date(b.date));
          console.log(timestampA - timestampB);
          return timestampB - timestampA;
        });
      }),
    );
  }

  filterDataByDate() {
    const dates = this.dateRangeControl.value;

    if (
      Array.isArray(dates) &&
      dates.length < 2 &&
      dates.some((x) => x === null)
    ) {
      return;
    }

    this.dataSource$ = this.reportRepo.data$.pipe(
      map((reports) => {
        if (dates === null) {
          return reports;
        }

        return reports.filter((report) => {
          const [fromDate, toDate] = dates || [];
          const date = fns.toDate(report.date);
          return date >= fromDate && date <= toDate;
        });
      }),
    );
  }
}
