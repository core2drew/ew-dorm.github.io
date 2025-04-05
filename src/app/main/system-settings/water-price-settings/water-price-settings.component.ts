import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { PushPipe } from '@ngrx/component';

import { WaterPriceDialogComponent } from './components/water-price-dialog/water-price-dialog.component';
import { WaterPriceTableComponent } from './components/water-price-table/water-price-table.component';
import { WaterPriceSettingsRepository } from './store/water-price-settings.repository';

@Component({
  selector: 'ds-water-price-settings',
  imports: [
    WaterPriceTableComponent,
    ButtonModule,
    BlockUIModule,
    ProgressSpinnerModule,
    WaterPriceDialogComponent,
    PushPipe,
  ],
  templateUrl: './water-price-settings.component.html',
  styleUrl: './water-price-settings.component.scss',
})
export class WaterPriceSettingsComponent implements OnInit {
  isWaterPriceDialogVisible = false;
  loading$: Observable<boolean | undefined> | undefined;

  constructor(private waterPriceSettingsRepo: WaterPriceSettingsRepository) {}

  ngOnInit(): void {
    this.loading$ = this.waterPriceSettingsRepo.loading$;
  }
}
