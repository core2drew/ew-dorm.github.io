import { Observable, of } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PushPipe } from '@ngrx/component';

import { PaymentHistoryRepository } from '../../repositories/payment-history/payment-history.repository';
import { UserRepository } from '../../repositories/user/user.repository';
import { User } from '../../shared/models/user.model';
import { PaymentHistoryTableActionBarComponent } from './components/payment-history-table-action-bar/payment-history-table-action-bar.component';
import { PaymentHistoryTableComponent } from './components/payment-history-table/payment-history-table.component';
import { PaymentHistory } from './models/payment-history.model';

@UntilDestroy()
@Component({
  selector: 'ds-payments-history',
  imports: [
    PaymentHistoryTableComponent,
    PushPipe,
    PaymentHistoryTableActionBarComponent,
    CommonModule,
  ],
  templateUrl: './payments-history.component.html',
  styleUrl: './payments-history.component.scss',
})
export class PaymentsHistoryComponent implements OnInit {
  dataSource$: Observable<PaymentHistory[]> = of([]);
  userDataSource$: Observable<User[]> = of([]);
  activeUser$: Observable<User | undefined> | undefined;
  loadedUser$: Observable<boolean | undefined> | undefined;

  constructor(
    private paymentHistoryRepo: PaymentHistoryRepository,
    private userRepo: UserRepository,
  ) {}

  ngOnInit(): void {
    this.userDataSource$ = this.userRepo.entities$;
    this.activeUser$ = this.userRepo.activeUser$;
    this.loadedUser$ = this.userRepo.loaded$;
    this.activeUser$.pipe(untilDestroyed(this)).subscribe((user) => {
      this.paymentHistoryRepo.getPaymentsHistory(user?.id!);
      this.dataSource$ = this.paymentHistoryRepo.entities$;
    });
  }

  changeActiveUser(name: string) {
    this.userRepo.setActiveIdByName(name);
  }

  async createPayment(data: PaymentHistory) {
    await this.paymentHistoryRepo.createPaymentRecord(data);
  }
}
