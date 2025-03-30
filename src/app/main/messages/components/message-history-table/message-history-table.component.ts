import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { PopoverModule } from 'primeng/popover';
import { TableModule } from 'primeng/table';

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Message } from '../../models/message.model';

@Component({
  selector: 'ds-message-history-table',
  imports: [TableModule, BadgeModule, PopoverModule, CommonModule, ChipModule],
  templateUrl: './message-history-table.component.html',
  styleUrl: './message-history-table.component.scss',
})
export class MessageHistoryTableComponent {
  @Input() messages: Message[] = [];
}
