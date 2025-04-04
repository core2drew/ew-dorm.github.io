import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectChangeEvent, SelectModule } from 'primeng/select';

import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, model, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { PAYMENT_METHOD } from '../../../../enums/payment-method';

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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      consumption: this.formBuilder.nonNullable.control(0),
      price: this.formBuilder.nonNullable.control(0),
      totalBalance: this.formBuilder.nonNullable.control(0),
      paymentMethod: this.formBuilder.nonNullable.control(''),
      amount: this.formBuilder.nonNullable.control(0),
      change: this.formBuilder.nonNullable.control(0),
      referenceNo: this.formBuilder.nonNullable.control(null),
    });

    this.initSelectedPaymentMethod();
  }

  initSelectedPaymentMethod() {
    this.paymentForm?.get('paymentMethod')?.setValue(PAYMENT_METHOD.CASH);
    this.selectedPaymentMethod = PAYMENT_METHOD.CASH;
  }

  selectPaymentMethod(event: SelectChangeEvent) {
    this.selectedPaymentMethod = event.value;
  }

  closeDialog() {
    this.visible.update(() => false);
    this.paymentForm?.reset();
    this.initSelectedPaymentMethod();
  }

  submitForm() {
    if (this.paymentForm?.invalid) {
      Object.values(this.paymentForm.controls).forEach((control) => {
        control.markAsTouched();
        control.markAsDirty();
      });
      return;
    }
  }
}
