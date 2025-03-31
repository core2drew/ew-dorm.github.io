import { format } from 'date-fns';
import { map } from 'rxjs';

import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { select, setProps } from '@ngneat/elf';
import { selectAllEntities, upsertEntities } from '@ngneat/elf-entities';

import { messageStore } from '../../main/messages/store/message.store';
import { SmsService } from '../../services/sms/sms.service';
import { User } from '../../shared/models/user.model';
import { UserRepository } from '../user/user.repository';

@Injectable({
  providedIn: 'root',
})
export class MessageRepository {
  $userDataSource: Signal<User[] | undefined> | undefined;
  entities$ = messageStore.pipe(selectAllEntities());
  loading$ = messageStore.pipe(select((state) => state.loading));
  loaded$ = messageStore.pipe(select((state) => state.loaded));

  constructor(
    private smsService: SmsService,
    private userRepo: UserRepository,
  ) {
    this.$userDataSource = toSignal(
      this.userRepo.entities$.pipe(
        map((entities) => entities.filter((entity) => !!entity.mobileNo)),
      ),
    );
  }

  async loadAllMessages() {
    messageStore.update(setProps({ loading: true, loaded: false }));
    const messages = await this.smsService.loadAllMessage();
    const data = messages.map(({ id, message, uids, timestamp }) => ({
      id,
      message,
      timestamp: format(timestamp.toDate(), 'MMMM d, y'),
      recipientsName: uids
        .map(
          (uid) =>
            (this.$userDataSource!() || []).find((user) => user.id === uid)
              ?.name as string,
        )
        .filter((name) => !!name),
    }));
    messageStore.update(setProps({ loading: false, loaded: true }));
    messageStore.update(
      upsertEntities(
        (data || []).map((d) => ({ ...d, loading: false, loaded: true })),
      ),
    );
  }
}
