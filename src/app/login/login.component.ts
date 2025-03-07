import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { Ripple } from 'primeng/ripple';

import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { ApprovalService } from '../services/approval/approval.service';
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
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private approvalService: ApprovalService,
  ) {}

  async signIn() {
    try {
      const response = await this.authService.signIn(
        this.emailFormControl.value!,
        this.passwordFormControl.value!,
      );

      await this.approvalService.checkApproval(response.user?.uid as string);
      await this.authService.signOut();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error as string,
        life: 3000,
      });
    }
  }
}
