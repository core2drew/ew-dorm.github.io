import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { filter } from 'rxjs';

import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { ReportRepository } from '../../repositories/report/report.repository';
import { Report } from '../../shared/models/report.model';
import { ReportTableComponent } from './components/report-table/report-table.component';
import { ReportService } from './report/report.service';

@UntilDestroy()
@Component({
  selector: 'ds-reports',
  imports: [
    ReportTableComponent,
    DatePickerModule,
    ReactiveFormsModule,
    FloatLabelModule,
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
  providers: [ReportService],
})
export class ReportsComponent {
  dataSource: Report[] = [];
  dateRangeControl = new FormControl<Date[]>([]);

  constructor(private reportRepo: ReportRepository) {}

  ngOnInit() {
    this.reportRepo.getReport().subscribe((data) => (this.dataSource = data));

    this.dateRangeControl.valueChanges
      .pipe(
        filter((arr) => {
          if (
            !Array.isArray(arr) ||
            arr.length < 2 ||
            arr.some((x) => x === null)
          ) {
            return false;
          }
          return true;
        }),
      )
      .subscribe((dates) => {
        console.log(dates);
      });
  }

  ngOnDestroy(): void {}
}
