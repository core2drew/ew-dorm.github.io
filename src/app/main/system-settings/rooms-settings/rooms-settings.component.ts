import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Observable } from 'rxjs';

import { Component, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PushPipe } from '@ngrx/component';

import { RoomDialogComponent } from './components/room-dialog/room-dialog.component';
import { RoomsTableComponent } from './components/rooms-table/rooms-table.component';
import { Room } from './models/room.model';
import { RoomSettingsRepositoryService } from './store/room-settings.repository';

@Component({
  selector: 'ds-rooms-settings',
  imports: [
    RoomsTableComponent,
    ButtonModule,
    BlockUIModule,
    ProgressSpinnerModule,
    PushPipe,
    RoomDialogComponent,
  ],
  templateUrl: './rooms-settings.component.html',
  styleUrl: './rooms-settings.component.scss',
})
export class RoomsSettingsComponent implements OnInit {
  isRoomDialogVisible = false;
  isUpdateMode = false;
  loading$: Observable<boolean | undefined> | undefined;
  $rooms: Signal<Room[] | undefined> | undefined;

  constructor(private roomSettingsRepo: RoomSettingsRepositoryService) {
    this.$rooms = toSignal(this.roomSettingsRepo.entities$);
  }

  ngOnInit(): void {
    this.loading$ = this.roomSettingsRepo.loading$;
    this.roomSettingsRepo.loadAllRooms();
  }

  showUpdateRoomDialog(roomId: string) {
    this.isRoomDialogVisible = true;
    this.isUpdateMode = true;
    this.roomSettingsRepo.setActiveRoomById(roomId);
  }
}
