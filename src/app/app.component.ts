import { ToastModule } from 'primeng/toast';
import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthRepoService } from './core/auth/auth-repo.service';

@Component({
  selector: 'ds-root',
  imports: [RouterOutlet, ToastModule, CommonModule],
  providers: [AuthRepoService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected loggedIn$: Observable<boolean>;
  protected loading$: Observable<boolean | undefined>;
  protected loaded$: Observable<boolean | undefined>;

  constructor(private authRepoService: AuthRepoService) {
    this.loggedIn$ = this.authRepoService.loggedIn$;
    this.loading$ = this.authRepoService.loading$;
    this.loaded$ = this.authRepoService.loaded$;
  }
}
