import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { map, Observable } from 'rxjs';

import { Component, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { PushPipe } from '@ngrx/component';

import { MessageRepository } from '../../repositories/message/message.repository';
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
    PushPipe,
    BlockUIModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
  providers: [SmsService],
})
export class MessagesComponent implements OnInit {
  isCreateMessageDialogVisible = false;
  $userDataSource: Signal<User[] | undefined> | undefined;

  messageDataSource$: Observable<Message[] | undefined> | undefined;
  loading$: Observable<boolean | undefined> | undefined;

  constructor(
    private userRepo: UserRepository,
    private messageRepo: MessageRepository,
  ) {
    this.$userDataSource = toSignal(
      this.userRepo.entities$.pipe(
        map((entities) => entities.filter((entity) => !!entity.mobileNo)),
      ),
    );
    this.messageDataSource$ = this.messageRepo.entities$;
    this.loading$ = this.messageRepo.loading$;
  }

  ngOnInit(): void {
    this.messageRepo.loadAllMessages();
  }
}
