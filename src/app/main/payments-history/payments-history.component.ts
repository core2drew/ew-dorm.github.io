import { Observable, of } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { PushPipe } from '@ngrx/component';

import { PaymentHistoryRepository } from '../../repositories/payment-history/payment-history.repository';
import { UserRepository } from '../../repositories/user/user.repository';
import { User } from '../../shared/models/user.model';
import { PaymentHistoryTableActionBarComponent } from './components/payment-history-table-action-bar/payment-history-table-action-bar.component';
import { PaymentHistoryTableComponent } from './components/payment-history-table/payment-history-table.component';
import { PaymentHistory } from './models/payment-history.model';

@Component({
  selector: 'ds-payments-history',
  imports: [
    PaymentHistoryTableComponent,
    PushPipe,
    PaymentHistoryTableActionBarComponent,
  ],
  templateUrl: './payments-history.component.html',
  styleUrl: './payments-history.component.scss',
})
export class PaymentsHistoryComponent implements OnInit {
  dataSource$: Observable<PaymentHistory[]> = of([]);
  userDataSource$: Observable<User[]> = of([]);

  constructor(
    private paymentHistoryRepo: PaymentHistoryRepository,
    private userRepo: UserRepository,
  ) {}

  ngOnInit(): void {
    this.userDataSource$ = this.userRepo.entities$;
    // this.paymentHistoryRepo.getPaymentHistory();
    this.dataSource$ = this.paymentHistoryRepo.data$;
  }
}
