import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

import { Component } from '@angular/core';

@Component({
  selector: 'ds-sidemenu',
  imports: [MenuModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss',
})
export class SidemenuComponent {
  items: MenuItem[] | undefined;

  constructor() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-gauge',
      },
      {
        label: 'Reports',
        icon: 'pi pi-chart-line',
      },
    ];
  }
}
