import { ButtonModule } from 'primeng/button';
import { IftaLabelModule } from 'primeng/iftalabel';
import { SelectModule } from 'primeng/select';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'ds-payment-history-table-action-bar',
  imports: [SelectModule, ButtonModule, ReactiveFormsModule, IftaLabelModule],
  templateUrl: './payment-history-table-action-bar.component.html',
  styleUrl: './payment-history-table-action-bar.component.scss',
})
export class PaymentHistoryTableActionBarComponent implements OnInit {
  @Input() users: User[] | undefined;
  @Input() activeUser: User | undefined;
  @Output() changeTenantEvent = new EventEmitter<string | null>();

  nameControl = new FormControl<string | undefined>(undefined);

  ngOnInit(): void {
    this.nameControl.setValue(this.activeUser?.name);

    this.nameControl.valueChanges.subscribe((value) => {
      this.changeTenantEvent.emit(value);
    });
  }
}
