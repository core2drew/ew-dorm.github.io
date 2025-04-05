import { Popover, PopoverModule } from 'primeng/popover';
import { TableModule } from 'primeng/table';
import { map } from 'rxjs';

import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { PushPipe } from '@ngrx/component';

import { UserRepository } from '../../../../../repositories/user/user.repository';
import { Room } from '../../models/room.model';

@Component({
  selector: 'ds-rooms-table',
  imports: [TableModule, PopoverModule, PushPipe],
  templateUrl: './rooms-table.component.html',
  styleUrl: './rooms-table.component.scss',
})
export class RoomsTableComponent {
  @Input() rooms: Room[] | undefined;
  @Output() showUpdateDialog = new EventEmitter<string>();
  @ViewChild('op') op!: Popover;
  selectedRoomId: string | undefined;
  constructor(private userRepo: UserRepository) {}

  getUserName$(id: string) {
    return this.userRepo.selectEntityId(id).pipe(map((d) => d?.name));
  }

  toggle(event: Event, roomId: string) {
    this.selectedRoomId = roomId;
    this.op.toggle(event);
  }

  updateDialog(roomId: string) {
    this.showUpdateDialog.emit(roomId);
  }
}
