import { ToastModule } from 'primeng/toast';

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'ds-root',
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {}
}
