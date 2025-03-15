import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ReportService } from '../../services/report/report.service';
import { ReportTableComponent } from './components/report-table/report-table.component';
import { Report } from './models/report.model';

@UntilDestroy()
@Component({
  selector: 'ds-reports',
  imports: [ReportTableComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
  providers: [ReportService],
})
export class ReportsComponent implements OnInit {
  dataSource: Report[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.reportService.data$.pipe(untilDestroyed(this)).subscribe((data) => {
      this.dataSource = data || []; // Update table with new real-time data
    });
    this.reportService.getRealTimeData();
  }
}
