import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { Component } from '@angular/core';

import { WaterPriceDialogComponent } from './components/water-price-dialog/water-price-dialog.component';
import { WaterPriceTableComponent } from './components/water-price-table/water-price-table.component';

@Component({
  selector: 'ds-system-settings',
  imports: [
    WaterPriceTableComponent,
    ButtonModule,
    BlockUIModule,
    ProgressSpinnerModule,
    WaterPriceDialogComponent,
  ],
  templateUrl: './system-settings.component.html',
  styleUrl: './system-settings.component.scss',
})
export class SystemSettingsComponent {
  isWaterPriceDialogVisible = false;
}
