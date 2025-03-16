import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';

import { Component, model } from '@angular/core';

@Component({
  selector: 'ds-messages-drawer',
  imports: [DrawerModule, CardModule],
  templateUrl: './messages-drawer.component.html',
  styleUrl: './messages-drawer.component.scss',
})
export class MessagesDrawerComponent {
  isVisible = model<boolean>(false);
}
