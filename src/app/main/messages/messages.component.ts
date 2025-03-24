import { Component } from '@angular/core';

import { MessageHistoryTableComponent } from './components/message-history-table/message-history-table.component';
import { Message } from './models/message.model';

@Component({
  selector: 'ds-messages',
  imports: [MessageHistoryTableComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  data: Message[] = [
    {
      subject: 'Team Meeting Reminder',
      message:
        "Don't forget our team meeting at 2 PM today in the conference room.",
      timestamp: '2023-10-27T13:00:00Z',
      recipients: ['Hinata'],
    },
    {
      subject: 'Project Update',
      message:
        "Here's the latest update on the project. Please review the attached document.",
      timestamp: '2023-10-26T10:30:00Z',
      recipients: ['Leo Oreo'],
    },
    {
      subject: 'Welcome to the Team!',
      message: "Welcome aboard! We're excited to have you join our team.",
      timestamp: '2023-10-25T16:45:00Z',
      recipients: ['Gong'],
    },
    {
      subject: 'System Maintenance',
      message:
        'Please be advised that system maintenance will occur tonight from 12 AM to 2 AM. Services will be unavailable during this time.',
      timestamp: '2023-10-28T09:00:00Z',
      recipients: ['Keluwang'],
    },
    {
      subject: 'Holiday Schedule',
      message: 'Please note that the office will be closed on [Holiday Date].',
      timestamp: '2023-10-24T11:00:00Z',
      recipients: ['Kurapekal'],
    },
  ];
}
