import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { WaterPriceSettingsRepository } from './water-price-settings/store/water-price-settings.repository';

@Component({
  selector: 'ds-system-settings',
  imports: [RouterOutlet],
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
