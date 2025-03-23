import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';

import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'ds-payment-history-table-action-bar',
  imports: [SelectModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './payment-history-table-action-bar.component.html',
  styleUrl: './payment-history-table-action-bar.component.scss',
})
export class PaymentHistoryTableActionBarComponent implements OnInit {
  @Input() users: User[] | undefined;
  @Input() activeUser: User | undefined;

  nameControl = new FormControl<string | undefined>(undefined);

  ngOnInit(): void {
    this.nameControl.setValue(this.activeUser?.name);
  }
}
