import { format } from 'date-fns';
import { ButtonModule } from 'primeng/button';
import { map } from 'rxjs';

import { Component, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

import { UserRepository } from '../../repositories/user/user.repository';
import { SmsService } from '../../services/sms/sms.service';
import { User } from '../../shared/models/user.model';
import { CreateMessageDialogComponent } from './components/create-message-dialog/create-message-dialog.component';
import { MessageHistoryTableComponent } from './components/message-history-table/message-history-table.component';
import { Message } from './models/message.model';

@Component({
  selector: 'ds-messages',
  imports: [
    MessageHistoryTableComponent,
    ButtonModule,
    CreateMessageDialogComponent,
    FormsModule,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
  providers: [SmsService],
})
export class MessagesComponent implements OnInit {
  isCreateMessageDialogVisible = false;
  $userDataSource: Signal<User[] | undefined> | undefined;

  data: Message[] = [];

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

  ngOnInit(): void {
    this.loadMessages();
  }

  async loadMessages() {
    const messages = await this.smsService.loadAllMessage();
    const preparedMessages: Message[] = messages.map(
      ({ message, uids, timestamp }) => ({
        message,
        timestamp: format(timestamp.toDate(), 'MMMM d, y'),
        recipientsName: uids
          .map(
            (uid) =>
              (this.$userDataSource!() || []).find((user) => user.id === uid)
                ?.name as string,
          )
          .filter((name) => !!name),
      }),
    );
    this.data = preparedMessages;
  }
}
