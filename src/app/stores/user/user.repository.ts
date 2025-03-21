import { Injectable } from '@angular/core';
import { setProps } from '@ngneat/elf';
import { upsertEntities } from '@ngneat/elf-entities';

import { UserService } from '../../services/user/user.service';
import { User } from './user.model';
import { userStore } from './user.store';

@Injectable({
  providedIn: 'root',
})
export class UserRepository {
  constructor(private userService: UserService) {}

  async loadAllUsersRecord() {
    userStore.update(setProps({ loading: true, loaded: false }));
    const users = await this.userService.getUsers();
    userStore.update(
      upsertEntities(
        (users || []).map(
          (d) => ({ ...d, loading: false, loaded: true } as User),
        ),
      ),
    );
    userStore.update(setProps({ loading: false, loaded: true }));
  }
}
