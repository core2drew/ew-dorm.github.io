import { TableModule } from 'primeng/table';

import { Component, Input } from '@angular/core';

import { WaterConsumption } from '../../../../shared/models/water-consumption.model';

@Component({
  selector: 'ds-report-table',
  imports: [TableModule],
  templateUrl: './report-table.component.html',
  styleUrl: './report-table.component.scss',
})
export class ReportTableComponent {
  @Input() data!: Array<WaterConsumption>;
}
