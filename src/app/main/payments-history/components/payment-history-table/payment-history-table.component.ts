import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';

import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PaymentHistory } from '../../models/payment-history.model';

@Component({
  selector: 'ds-payment-history-table',
  imports: [
    TableModule,
    ChipModule,
    CommonModule,
    ButtonModule,
    MenuModule,
    CurrencyPipe,
    DecimalPipe,
  ],
  templateUrl: './payment-history-table.component.html',
  styleUrl: './payment-history-table.component.scss',
})
export class PaymentHistoryTableComponent implements OnInit {
  @Input() data!: PaymentHistory[] | undefined;
  @Output() createPayment = new EventEmitter<PaymentHistory>();

  ngOnInit(): void {}

  payNow(data: PaymentHistory) {
    this.createPayment.emit(data);
  }
}
