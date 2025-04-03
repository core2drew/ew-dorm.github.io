import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component, model, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PushPipe } from '@ngrx/component';

import { UserRepository } from '../../../../repositories/user/user.repository';

@Component({
  selector: 'ds-users-dialog',
  imports: [
    DialogModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    FormsModule,
    IftaLabelModule,
    CommonModule,
    PushPipe,
  ],
  templateUrl: './users-dialog.component.html',
  styleUrl: './users-dialog.component.scss',
})
export class UsersDialogComponent implements OnInit {
  isUpdateMode = model<boolean>(false);
  visible = model<boolean>(false);
  userForm: FormGroup | undefined;
  loading$: Observable<boolean | undefined> | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private userRepo: UserRepository,
  ) {}

  get title() {
    return this.isUpdateMode() ? 'Update user' : 'Create user';
  }

  get buttonLabel() {
    return this.isUpdateMode() ? 'Update' : 'Create';
  }

  ngOnInit(): void {
    this.loading$ = this.userRepo.loading$;
    this.userForm = this.formBuilder.group({
      firstName: this.formBuilder.nonNullable.control('', [
        Validators.required,
      ]),
      lastName: this.formBuilder.nonNullable.control('', [Validators.required]),
      email: this.formBuilder.nonNullable.control('', [
        Validators.required,
        Validators.email,
      ]),
      mobileNo: this.formBuilder.nonNullable.control('', [
        Validators.required,
        Validators.pattern(/^(\+\d{2})?\d{10}$/),
      ]),
    });
  }

  closeDialog() {
    this.visible.update(() => false);
    this.isUpdateMode.update(() => false);
    this.userForm?.reset();
  }

  submitForm() {
    if (this.userForm?.invalid) {
      Object.values(this.userForm.controls).forEach((control) => {
        control.markAsTouched();
        control.markAsDirty();
      });
      return;
    }
    this.userRepo.createUser(this.userForm?.value, this.closeDialog.bind(this));
  }
}
