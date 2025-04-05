import { format } from 'date-fns';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { where } from 'firebase/firestore';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';

import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { select, setProps } from '@ngneat/elf';
import {
  getEntityByPredicate,
  resetActiveId,
  selectActiveEntity,
  selectAllEntities,
  selectEntity,
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
    private messageService: MessageService,
  ) {}

  setActiveIdByName(username: string) {
    const id = userStore.query(
      getEntityByPredicate(({ name }) => name === username),
    )?.id;
    userStore.update(setActiveId(id));
  }

  setActiveUserById(id: string) {
    userStore.update(setActiveId(id));
  }

  resetActiveId() {
    userStore.update(resetActiveId());
  }

  selectEntityId(id: string) {
    return userStore.pipe(selectEntity(id));
  }

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
          return {
            ...d,
            name,
            loading: false,
            loaded: true,
          } as User;
        }),
      ),
    );
    userStore.update(setProps({ loading: false, loaded: true }));
  }

  createUser(user: Omit<User, 'id'>, callback: Function) {
    userStore.update(setProps({ loading: true, loaded: false }));
    this.userService.createUser(user).subscribe({
      next: (user) => {
        if (user!.id) {
          const auth = getAuth();
          sendPasswordResetEmail(auth, user.email);
          const createdAt = format(user.createdAt!, 'MMM dd, y');
          const updatedAt = format(user.updatedAt!, 'MMM dd, y');
          const name = `${user.firstName} ${user.lastName}`;

          userStore.update(
            upsertEntities({
              ...user,
              name,
              loading: false,
              loaded: true,
              createdAt,
              updatedAt,
            } as User),
          );
          callback();
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Uh oh!',
          detail: 'Something went wrong. Please try again.',
          life: 3000,
        });
        userStore.update(setProps({ loading: false, loaded: true }));
      },
      complete: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'User created',
          detail: 'User is created successfully.',
          life: 3000,
        });
        userStore.update(setProps({ loading: false, loaded: true }));
      },
    });
  }

  updateUser(user: User, callback: Function) {
    userStore.update(setProps({ loading: true, loaded: false }));
    this.userService.updateUser(user).subscribe({
      next: (user) => {
        if (user!.id) {
          const createdAt = format(user.createdAt!, 'MMM dd, y');
          const updatedAt = format(user.updatedAt!, 'MMM dd, y');

          const name = `${user.firstName} ${user.lastName}`;

          userStore.update(
            upsertEntities({
              ...user,
              name,
              loading: false,
              loaded: true,
              updatedAt,
              createdAt,
            } as User),
          );
          callback();
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Uh oh!',
          detail: 'Something went wrong. Please try again.',
          life: 3000,
        });
        userStore.update(setProps({ loading: false, loaded: true }));
      },
      complete: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'User updated',
          detail: 'User is updated successfully.',
          life: 3000,
        });
        userStore.update(setProps({ loading: false, loaded: true }));
      },
    });
  }
}
