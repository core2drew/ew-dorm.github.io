import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { filter } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ReportService } from '../../services/report/report.service';
import { WaterConsumption } from '../../shared/models/water-consumption.model';
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
export class ReportsComponent implements OnInit {
  dataSource: WaterConsumption[] = [];
  dateRangeControl = new FormControl<Date[]>([]);

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.reportService.data$.pipe(untilDestroyed(this)).subscribe((data) => {
      this.dataSource = data || []; // Update table with new real-time data
    });
    this.reportService.init();

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
        this.reportService.filterByDate(dates as Date[]);
      });
  }
}
