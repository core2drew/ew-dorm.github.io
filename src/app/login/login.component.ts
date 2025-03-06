import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { CardModule } from 'primeng/card';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { AUTH_ERROR_CODE } from '../enums/auth-error-code';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Ripple } from 'primeng/ripple';
@Component({
  selector: 'ds-login',
  imports: [
    CardModule,
    ReactiveFormsModule,
    IftaLabelModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    Ripple,
  ],
  providers: [AuthService, MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
  ) {}

  signIn() {
    this.authService
      .signIn(this.emailFormControl.value!, this.passwordFormControl.value!)
      .then((user) => console.log('Login successful:', user))
      .catch((errorCode) => {
        console.log(errorCode);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong',
          life: 3000,
        });
      });
  }
}
