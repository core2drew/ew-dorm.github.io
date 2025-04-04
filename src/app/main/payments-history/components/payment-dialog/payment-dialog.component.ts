import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { filter } from 'rxjs';

import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, model, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { PAYMENT_METHOD } from '../../../../enums/payment-method';
import { PaymentHistoryRepository } from '../../../../repositories/payment-history/payment-history.repository';
import { PaymentHistory } from '../../models/payment-history.model';

@UntilDestroy()
@Component({
  selector: 'ds-payment-dialog',
  imports: [
    DialogModule,
    SelectModule,
    ButtonModule,
    ReactiveFormsModule,
    InputNumberModule,
    CurrencyPipe,
    DecimalPipe,
    CommonModule,
  ],
  templateUrl: './payment-dialog.component.html',
  styleUrl: './payment-dialog.component.scss',
})
export class PaymentDialogComponent implements OnInit {
  visible = model<boolean>(false);
  paymentForm: FormGroup | undefined;
  paymentMethods = [
    { name: 'GCash', value: PAYMENT_METHOD.GCASH },
    { name: 'Paymaya', value: PAYMENT_METHOD.PAYMAYA },
    { name: 'Bank transfer', value: PAYMENT_METHOD.BANK_TRANSFER },
    { name: 'Cash', value: 'cash' },
  ];
  selectedPaymentMethod: string | undefined;
  $selectedPaymentHistory: Signal<PaymentHistory | undefined> | undefined;

  get isPaymentCashless() {
    const methods = [
      PAYMENT_METHOD.GCASH,
      PAYMENT_METHOD.PAYMAYA,
      PAYMENT_METHOD.BANK_TRANSFER,
    ];
    return methods.some((method) => method === this.selectedPaymentMethod);
  }

  get isPaymentCash() {
    return PAYMENT_METHOD.CASH === this.selectedPaymentMethod;
  }

  get totalConsumption() {
    return this.paymentForm?.get('totalConsumption')?.value;
  }

  get pricePerCubicMeter() {
    return this.paymentForm?.get('pricePerCubicMeter')?.value;
  }

  get totalBalance() {
    return this.paymentForm?.get('totalBalance')?.value;
  }

  get change() {
    return this.paymentForm?.get('change')?.value;
  }

  get amount() {
    return this.paymentForm?.get('amount')?.value;
  }

  get referenceNo() {
    return this.paymentForm?.get('referenceNo')?.value;
  }

  get isPaymentAmountValid() {
    if (this.isPaymentCash) {
      return this.amount >= this.totalBalance;
    }
    return !!this.referenceNo;
  }

  constructor(
    private formBuilder: FormBuilder,
    private paymentHistoryRepo: PaymentHistoryRepository,
  ) {
    this.$selectedPaymentHistory = toSignal(
      this.paymentHistoryRepo.activePaymentHistory$,
    );
  }

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      totalConsumption: this.formBuilder.nonNullable.control(0),
      pricePerCubicMeter: this.formBuilder.nonNullable.control(0),
      totalBalance: this.formBuilder.nonNullable.control(0),
      paymentMethod: this.formBuilder.nonNullable.control(''),
      amount: this.formBuilder.nonNullable.control(0, [
        Validators.min(0),
        Validators.max(5000),
      ]),
      change: this.formBuilder.nonNullable.control(0, [Validators.min(0)]),
      referenceNo: this.formBuilder.nonNullable.control(null),
    });

    this.paymentHistoryRepo.activePaymentHistory$
      .pipe(filter((d) => !!d))
      .subscribe((data) => {
        console.log(data);
        const { totalConsumption, totalBalance, pricePerCubicMeter } =
          data as PaymentHistory;
        this.paymentForm?.setValue({
          totalConsumption,
          totalBalance,
          pricePerCubicMeter,
          paymentMethod: PAYMENT_METHOD.CASH,
          amount: 0,
          change: 0,
          referenceNo: null,
        });
      });

    this.initSelectedPaymentMethod();
  }

  computeChange(value: number) {
    const change = value - this.totalBalance;
    this.paymentForm?.get('change')?.setValue(change < 0 ? 0 : change);
  }

  initSelectedPaymentMethod() {
    this.paymentForm?.get('paymentMethod')?.setValue(PAYMENT_METHOD.CASH);
    this.selectedPaymentMethod = PAYMENT_METHOD.CASH;
    this.paymentForm?.get('amount')?.addValidators([Validators.required]);
  }

  resetPaymentFields() {
    this.paymentForm?.get('amount')?.reset();
    this.paymentForm?.get('change')?.reset();
    this.paymentForm?.get('referenceNo')?.reset();
  }

  selectPaymentMethod(event: SelectChangeEvent) {
    this.selectedPaymentMethod = event.value;
    this.resetPaymentFields();
  }

  closeDialog() {
    this.visible.update(() => false);
    this.initSelectedPaymentMethod();
    this.resetPaymentFields();
  }

  submitForm() {
    if (this.paymentForm?.invalid) {
      Object.values(this.paymentForm.controls).forEach((control) => {
        control.markAsTouched();
        control.markAsDirty();
      });
      return;
    }

    if (this.isPaymentAmountValid) {
      console.log(this.paymentForm?.value);
    }
  }
}
