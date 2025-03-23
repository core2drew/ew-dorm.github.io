import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';

import { Component, Input } from '@angular/core';

import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'ds-payment-history-table-action-bar',
  imports: [SelectModule, ButtonModule],
  templateUrl: './payment-history-table-action-bar.component.html',
  styleUrl: './payment-history-table-action-bar.component.scss',
})
export class PaymentHistoryTableActionBarComponent {
  @Input() users: User[] | undefined;
}
