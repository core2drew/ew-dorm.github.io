import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';

import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PaymentHistory } from '../../models/payment-history.model';
import { PrintReceiptService } from '../../services/print-receipt.service';

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

  constructor(private printReceiptService: PrintReceiptService) {}

  payNow(data: PaymentHistory) {
    this.createPayment.emit(data);
  }

  printReceipt() {
    this.printReceiptService.printReceipt();
  }
}
