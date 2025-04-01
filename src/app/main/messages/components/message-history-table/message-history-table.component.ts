import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { TableModule } from 'primeng/table';

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Message } from '../../models/message.model';

@Component({
  selector: 'ds-message-history-table',
  imports: [TableModule, BadgeModule, CommonModule, ChipModule],
  templateUrl: './message-history-table.component.html',
  styleUrl: './message-history-table.component.scss',
})
export class MessageHistoryTableComponent {
  @Input() messages: Message[] | undefined = [];
}
