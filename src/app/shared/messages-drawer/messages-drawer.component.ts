import { DrawerModule } from 'primeng/drawer';

import { Component, model } from '@angular/core';

@Component({
  selector: 'ds-messages-drawer',
  imports: [DrawerModule],
  templateUrl: './messages-drawer.component.html',
  styleUrl: './messages-drawer.component.scss',
})
export class MessagesDrawerComponent {
  isVisible = model<boolean>(false);
}
