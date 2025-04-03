import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Observable } from 'rxjs';

import { Component, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PushPipe } from '@ngrx/component';

import { UserRepository } from '../../repositories/user/user.repository';
import { User } from '../../shared/models/user.model';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { UsersTableComponent } from './components/users-table/users-table.component';

@Component({
  selector: 'ds-users',
  imports: [
    UsersTableComponent,
    ButtonModule,
    UsersDialogComponent,
    BlockUIModule,
    ProgressSpinnerModule,
    PushPipe,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  isUserDialogVisible = false;
  isUpdateMode = false;
  $users: Signal<User[] | undefined> | undefined;
  loading$: Observable<boolean | undefined> | undefined;
  loaded$: Observable<boolean | undefined> | undefined;

  constructor(private userRepo: UserRepository) {
    this.$users = toSignal(this.userRepo.entities$);
  }
  ngOnInit(): void {
    this.loading$ = this.userRepo.loading$;
    this.loaded$ = this.userRepo.loaded$;
  }

  showUpdateUserDialog(uid: string) {
    this.isUserDialogVisible = true;
    this.isUpdateMode = true;
    this.userRepo.setActiveUserById(uid);
  }
}
