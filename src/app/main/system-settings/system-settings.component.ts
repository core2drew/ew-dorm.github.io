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
  selector: 'ds-system-settings',
  imports: [
    WaterPriceTableComponent,
    ButtonModule,
    BlockUIModule,
    ProgressSpinnerModule,
    WaterPriceDialogComponent,
    PushPipe,
  ],
  templateUrl: './system-settings.component.html',
  styleUrl: './system-settings.component.scss',
})
export class SystemSettingsComponent implements OnInit {
  isWaterPriceDialogVisible = false;
  loading$: Observable<boolean | undefined> | undefined;

  constructor(private waterPriceSettingsRepo: WaterPriceSettingsRepository) {}

  ngOnInit(): void {
    this.loading$ = this.waterPriceSettingsRepo.loading$;
  }
}
