import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { PaymentHistory } from '../../models/payment-history.model';

@Component({
  selector: 'ds-payment-history-table',
  imports: [TableModule, ChipModule, CommonModule, ButtonModule, MenuModule],
  templateUrl: './payment-history-table.component.html',
  styleUrl: './payment-history-table.component.scss',
})
export class PaymentHistoryTableComponent implements OnInit {
  @Input() data!: PaymentHistory[] | undefined;
  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Refresh',
            icon: 'pi pi-refresh',
          },
          {
            label: 'Export',
            icon: 'pi pi-upload',
          },
        ],
      },
    ];
  }
}
