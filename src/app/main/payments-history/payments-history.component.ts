import { ButtonModule } from 'primeng/button';
import { Observable, of } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { PushPipe } from '@ngrx/component';

import { PaymentHistoryRepository } from '../../repositories/payment-history/payment-history.repository';
import { PaymentHistoryTableComponent } from './components/payment-history-table/payment-history-table.component';
import { PaymentHistory } from './models/payment-history.model';

@Component({
  selector: 'ds-payments-history',
  imports: [PaymentHistoryTableComponent, PushPipe, ButtonModule],
  templateUrl: './payments-history.component.html',
  styleUrl: './payments-history.component.scss',
})
export class PaymentsHistoryComponent implements OnInit {
  dataSource$: Observable<PaymentHistory[]> = of([]);
  constructor(private paymentHistoryRepo: PaymentHistoryRepository) {}

  ngOnInit(): void {
    this.paymentHistoryRepo.getPaymentHistory();
    this.dataSource$ = this.paymentHistoryRepo.data$;
  }
}
