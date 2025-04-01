import { ButtonModule } from 'primeng/button';

import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { UserRepository } from '../../repositories/user/user.repository';
import { User } from '../../shared/models/user.model';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { UsersTableComponent } from './components/users-table/users-table.component';

@Component({
  selector: 'ds-users',
  imports: [UsersTableComponent, ButtonModule, UsersDialogComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  isUserDialogVisible = false;
  isUpdateMode = false;
  $users: Signal<User[] | undefined> | undefined;

  constructor(private userRepo: UserRepository) {
    this.$users = toSignal(this.userRepo.entities$);
  }

  updateUser() {
    this.isUserDialogVisible = true;
    this.isUpdateMode = false;
  }
}
