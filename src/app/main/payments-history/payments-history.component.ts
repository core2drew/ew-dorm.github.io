import { Component } from '@angular/core';

import { PaymentHistoryTableComponent } from './components/payment-history-table/payment-history-table.component';

@Component({
  selector: 'ds-payments-history',
  imports: [PaymentHistoryTableComponent],
  templateUrl: './payments-history.component.html',
  styleUrl: './payments-history.component.scss',
})
export class PaymentsHistoryComponent {}
