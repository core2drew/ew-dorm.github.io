import { TableModule } from 'primeng/table';
import { Observable, of } from 'rxjs';

import { Component } from '@angular/core';
import { PushPipe } from '@ngrx/component';

import { Room } from '../../models/room.model';

@Component({
  selector: 'ds-rooms-table',
  imports: [TableModule, PushPipe],
  templateUrl: './rooms-table.component.html',
  styleUrl: './rooms-table.component.scss',
})
export class RoomsTableComponent {
  dataSource$: Observable<Room[]> = of([]);
}
