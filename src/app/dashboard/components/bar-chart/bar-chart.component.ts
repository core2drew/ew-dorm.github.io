import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ds-bar-chart',
  imports: [CardModule, ChartModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent implements OnInit {
  @Input() title: string = '';
  @Input() data: any;
  ngOnInit(): void {}
}
