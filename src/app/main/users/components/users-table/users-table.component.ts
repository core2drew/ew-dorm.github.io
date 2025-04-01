import { Popover, PopoverModule } from 'primeng/popover';
import { TableModule } from 'primeng/table';

import { Component, Input, ViewChild } from '@angular/core';

import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'ds-users-table',
  imports: [TableModule, PopoverModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersTableComponent {
  @Input() users: User[] | undefined;

  @ViewChild('op') op!: Popover;

  toggle(event: Event) {
    this.op.toggle(event);
  }
}
