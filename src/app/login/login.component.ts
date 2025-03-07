import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { Ripple } from 'primeng/ripple';
import { BehaviorSubject } from 'rxjs';

import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PushPipe } from '@ngrx/component';

import { ApprovalService } from '../services/approval/approval.service';
import { AuthService, UserCredential } from '../services/auth/auth.service';

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

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private approvalService: ApprovalService,
    private router: Router,
  ) {}

  async checkApproval(response: UserCredential) {
    const isApproved = await this.approvalService.isUserApproved(
      response.user?.uid as string,
    );

    if (!isApproved) {
      this.messageService.add({
        severity: 'info',
        summary: 'Pending approval',
        detail:
          'Your account is pending approval. Please wait for admin approval.',
        life: 3000,
      });
      this.authService.signOut();
      return;
    }

    this.router.navigate(['/dashboard']);
  }

  async signIn() {
    try {
      this.loading$.next(true);
      const response = await this.authService.signIn(
        this.emailFormControl.value!,
        this.passwordFormControl.value!,
      );

      this.checkApproval(response);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error as string,
        life: 3000,
      });
    } finally {
      this.loading$.next(false);
    }
  }
}
