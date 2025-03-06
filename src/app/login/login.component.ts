import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { Ripple } from 'primeng/ripple';

import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

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
  constructor(private authService: AuthService) {}
  signIn() {
    this.authService
      .signIn(this.emailFormControl.value!, this.passwordFormControl.value!)
      .then((user) => console.log('Login successful:', user));
  }
}
