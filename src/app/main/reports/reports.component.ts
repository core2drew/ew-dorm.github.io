import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { filter } from 'rxjs';

import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { ReportService } from '../../services/report/report.service';
import { WaterConsumption } from '../../stores/water-consumption/water-consumption.model';
import { ReportTableComponent } from './components/report-table/report-table.component';

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
  dataSource: WaterConsumption[] = [];
  dateRangeControl = new FormControl<Date[]>([]);

  constructor() {}

  ngOnInit() {
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
