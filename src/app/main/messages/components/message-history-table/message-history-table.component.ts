import { TableModule } from 'primeng/table';

import { Component, Input } from '@angular/core';

import { Message } from '../../models/message.model';

@Component({
  selector: 'ds-message-history-table',
  imports: [TableModule],
  templateUrl: './message-history-table.component.html',
  styleUrl: './message-history-table.component.scss',
})
export class MessageHistoryTableComponent {
  @Input() messages: Message[] = [];
}
