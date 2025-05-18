import { getUnixTime } from 'date-fns';
import { TableModule } from 'primeng/table';
import { map, Observable, of } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { PushPipe } from '@ngrx/component';

import { WaterPrice } from '../../models/water-price.model';
import { WaterPriceSettingsRepository } from '../../store/water-price-settings.repository';

@Component({
  selector: 'ds-water-price-table',
  imports: [TableModule, PushPipe],
  templateUrl: './water-price-table.component.html',
  styleUrl: './water-price-table.component.scss',
})
export class WaterPriceTableComponent implements OnInit {
  dataSource$: Observable<WaterPrice[]> = of([]);

  constructor(private waterPriceSettingsRepo: WaterPriceSettingsRepository) {}

  ngOnInit(): void {
    this.waterPriceSettingsRepo.loadAllPrices();
    this.dataSource$ = this.waterPriceSettingsRepo.entities$.pipe(
      map((waterPrices) => {
        return waterPrices.sort((a, b) => {
          const timestampA = getUnixTime(new Date(a.timestamp));
          const timestampB = getUnixTime(new Date(b.timestamp));
          return timestampB - timestampA;
        });
      }),
    );
  }
}
