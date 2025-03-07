import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { Ripple } from 'primeng/ripple';
import { BehaviorSubject } from 'rxjs';

import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PushPipe } from '@ngrx/component';

import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'ds-login',
  imports: [
    CardModule,
    ReactiveFormsModule,
    IftaLabelModule,
    InputTextModule,
    ButtonModule,
    Ripple,
    FloatLabelModule,
    PushPipe,
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private authService: AuthService) {}

  async signIn(e: Event) {
    e.preventDefault();
    try {
      this.loading$.next(true);
      await this.authService.signIn(
        this.emailFormControl.value!,
        this.passwordFormControl.value!,
      );
    } catch (error) {
      console.error(error);
    } finally {
      this.loading$.next(false);
    }
  }
}
