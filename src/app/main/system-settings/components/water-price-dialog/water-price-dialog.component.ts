import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';

import { CommonModule } from '@angular/common';
import { Component, model, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { WaterPriceSettingsService } from '../../services/water-system-settings/water-price-settings.service';

@Component({
  selector: 'ds-water-price-dialog',
  imports: [
    DialogModule,
    InputNumberModule,
    ReactiveFormsModule,
    ButtonModule,
    CommonModule,
  ],
  providers: [WaterPriceSettingsService],
  templateUrl: './water-price-dialog.component.html',
  styleUrl: './water-price-dialog.component.scss',
})
export class WaterPriceDialogComponent implements OnInit {
  visible = model<boolean>(false);
  waterPriceForm: FormGroup | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private waterPriceSettingsService: WaterPriceSettingsService,
  ) {}

  get priceField() {
    return this.waterPriceForm?.get('price');
  }

  ngOnInit(): void {
    this.waterPriceForm = this.formBuilder.group({
      price: this.formBuilder.nonNullable.control(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
    });
  }

  closeDialog() {
    this.visible.update(() => false);
  }

  submitForm() {
    if (this.waterPriceForm?.valid) {
      this.waterPriceSettingsService.createNewPrice(
        {
          ...this.waterPriceForm.value,
        },
        this.closeDialog.bind(this),
      );
    }
  }
}
