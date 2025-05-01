import { CardModule } from 'primeng/card';

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ds-metric-card',
  imports: [CardModule, CommonModule],
  templateUrl: './metric-card.component.html',
  styleUrl: './metric-card.component.scss',
})
export class MetricCardComponent {
  @Input() title = '';
  @Input() value: number | string | undefined;
  @Input() unit = '';
  @Input() isDecimal = false;
}
