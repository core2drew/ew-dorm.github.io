import { ButtonModule } from 'primeng/button';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
})
export class MessagesComponent {
  isCreateMessageDialogVisible = false;
  data: Message[] = [
    {
      message:
        "Don't forget our team meeting at 2 PM today in the conference room.",
      timestamp: '2023-10-27T13:00:00Z',
      recipientsName: ['Hinata'],
    },
    {
      message:
        "Here's the latest update on the project. Please review the attached document.",
      timestamp: '2023-10-26T10:30:00Z',
      recipientsName: ['Leo Oreo', 'Gong'],
    },
    {
      message: "Welcome aboard! We're excited to have you join our team.",
      timestamp: '2023-10-25T16:45:00Z',
      recipientsName: ['Gong'],
    },
    {
      message:
        'Please be advised that system maintenance will occur tonight from 12 AM to 2 AM. Services will be unavailable during this time.',
      timestamp: '2023-10-28T09:00:00Z',
      recipientsName: ['Keluwang'],
    },
    {
      message: 'Please note that the office will be closed on [Holiday Date].',
      timestamp: '2023-10-24T11:00:00Z',
      recipientsName: ['Kurapekal'],
    },
  ];
}
