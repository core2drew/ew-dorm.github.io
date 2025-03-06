import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { CardModule } from 'primeng/card';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { AUTH_ERROR_CODE } from '../enums/auth-error-code';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Ripple } from 'primeng/ripple';
import { Toast } from 'primeng/toast';
@Component({
  selector: 'ds-login',
  imports: [
    CardModule,
    ReactiveFormsModule,
    IftaLabelModule,
    InputTextModule,
    ButtonModule,
    Ripple,
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
