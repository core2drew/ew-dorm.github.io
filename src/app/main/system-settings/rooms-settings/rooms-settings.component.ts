import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { PushPipe } from '@ngrx/component';

import { WaterPriceSettingsRepository } from '../water-price-settings/store/water-price-settings.repository';
import { RoomsTableComponent } from './components/rooms-table/rooms-table.component';

@Component({
  selector: 'ds-rooms-settings',
  imports: [
    RoomsTableComponent,
    ButtonModule,
    BlockUIModule,
    ProgressSpinnerModule,
    PushPipe,
  ],
  templateUrl: './rooms-settings.component.html',
  styleUrl: './rooms-settings.component.scss',
})
export class RoomsSettingsComponent implements OnInit {
  isWaterPriceDialogVisible = false;
  loading$: Observable<boolean | undefined> | undefined;

  constructor(private waterPriceSettingsRepo: WaterPriceSettingsRepository) {}

  ngOnInit(): void {
    this.loading$ = this.waterPriceSettingsRepo.loading$;
  }
}
