import { where } from 'firebase/firestore';

import { Injectable } from '@angular/core';
import { select, setProps } from '@ngneat/elf';
import {
  selectActiveEntity,
  selectAllEntities,
  setActiveId,
  upsertEntities,
} from '@ngneat/elf-entities';

import { AuthRepoService } from '../../core/auth/auth-repo.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../shared/models/user.model';
import { userStore } from '../../stores/user.store';

@Injectable({
  providedIn: 'root',
})
export class UserRepository {
  entities$ = userStore.pipe(selectAllEntities());
  activeUser$ = userStore.pipe(selectActiveEntity());
  loading$ = userStore.pipe(select((state) => state.loading));
  loaded$ = userStore.pipe(select((state) => state.loaded));

  constructor(
    private userService: UserService,
    private authRepo: AuthRepoService,
  ) {}

  async loadUser() {
    const uid = this.authRepo.currentUser()?.uid as string;
    userStore.update(setProps({ loading: true, loaded: false }));
    const queryConstraints = [where('id', '==', uid)];
    const users = await this.userService.getUsers(queryConstraints);

    userStore.update(
      upsertEntities(
        (users || []).map(
          (d) => ({ ...d, loading: false, loaded: true } as User),
        ),
      ),
      setActiveId(uid),
    );
  }

  async loadAllUsers() {
    userStore.update(setProps({ loading: true, loaded: false }));
    const users = await this.userService.getUsers();
    userStore.update(
      upsertEntities(
        (users || []).map((d) => {
          const name = `${d.firstName} ${d.lastName}`;
          return { ...d, name, loading: false, loaded: true } as User;
        }),
      ),
    );
    userStore.update(
      setProps({ loading: false, loaded: true }),
      setActiveId(users[0].id),
    );
  }
}
