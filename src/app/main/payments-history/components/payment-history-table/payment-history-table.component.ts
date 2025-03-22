import { format } from 'date-fns';
import { ChipModule } from 'primeng/chip';
import { TableModule } from 'primeng/table';

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { PaymentHistory } from '../../models/payment-history.model';

@Component({
  selector: 'ds-payment-history-table',
  imports: [TableModule, ChipModule, CommonModule],
  templateUrl: './payment-history-table.component.html',
  styleUrl: './payment-history-table.component.scss',
})
export class PaymentHistoryTableComponent implements OnInit {
  @Input() data!: Array<PaymentHistory>;

  ngOnInit(): void {
    this.data = [
      {
        month: format(new Date(), 'MMMM'),
        consumption: 20,
        bill: 500,
        status: true,
      },
    ];
  }
}
