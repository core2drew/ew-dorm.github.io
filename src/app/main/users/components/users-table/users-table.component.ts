import { Popover, PopoverModule } from 'primeng/popover';
import { TableModule } from 'primeng/table';

import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'ds-users-table',
  imports: [TableModule, PopoverModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersTableComponent {
  @Input() users: User[] | undefined;
  @Output() showUpdateDialog = new EventEmitter<string>();
  @ViewChild('op') op!: Popover;

  selectedUserId: string | undefined;

  toggle(event: Event, uid: string) {
    this.selectedUserId = uid;
    this.op.toggle(event);
  }

  updateDialog(uid: string) {
    this.showUpdateDialog.emit(uid);
  }
}
