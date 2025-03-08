import { ToastModule } from 'primeng/toast';
import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LetDirective, PushPipe } from '@ngrx/component';

import { AuthRepoService } from './core/auth/auth-repo.service';
import { SidemenuComponent } from './shared/sidemenu/sidemenu.component';
import { TopmenuComponent } from './shared/topmenu/topmenu.component';

@Component({
  selector: 'ds-root',
  imports: [
    RouterOutlet,
    ToastModule,
    TopmenuComponent,
    SidemenuComponent,
    CommonModule,
    LetDirective,
    PushPipe,
  ],
  providers: [AuthRepoService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected loggedIn$: Observable<boolean>;

  constructor(private authRepoService: AuthRepoService) {
    this.loggedIn$ = this.authRepoService.loggedIn$;
  }
}
