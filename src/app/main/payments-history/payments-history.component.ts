import { Component, OnInit } from '@angular/core';

import { PaymentHistoryRepository } from '../../repositories/payment-history/payment-history.repository';
import { PaymentHistoryTableComponent } from './components/payment-history-table/payment-history-table.component';

@Component({
  selector: 'ds-payments-history',
  imports: [PaymentHistoryTableComponent],
  templateUrl: './payments-history.component.html',
  styleUrl: './payments-history.component.scss',
})
export class PaymentsHistoryComponent implements OnInit {
  constructor(private paymentHistoryRepo: PaymentHistoryRepository) {}

  ngOnInit(): void {
    this.paymentHistoryRepo.getPaymentHistory();
  }
}
