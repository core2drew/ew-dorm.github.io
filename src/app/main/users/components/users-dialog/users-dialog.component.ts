import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';
import {
  Component,
  model,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PushPipe } from '@ngrx/component';

import { UserRepository } from '../../../../repositories/user/user.repository';
import { User } from '../../../../shared/models/user.model';

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
export class UsersDialogComponent implements OnInit, OnChanges {
  isUpdateMode = model<boolean>(false);
  visible = model<boolean>(false);
  userForm: FormGroup | undefined;
  loading$: Observable<boolean | undefined> | undefined;
  activeUser$: Observable<User | undefined> | undefined;
  private activeUserId: string | undefined;
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isUpdateMode']) {
      if (this.isUpdateMode()) {
        this.userForm?.controls['email'].disable();
      }
    }
  }

  ngOnInit(): void {
    this.loading$ = this.userRepo.loading$;
    this.activeUser$ = this.userRepo.activeUser$;

    this.activeUser$.subscribe((activeUser) => {
      const { firstName, lastName, email, mobileNo, id } = activeUser || {};
      this.activeUserId = id;
      this.userForm = this.formBuilder.group({
        firstName: this.formBuilder.nonNullable.control(firstName, [
          Validators.required,
        ]),
        lastName: this.formBuilder.nonNullable.control(lastName, [
          Validators.required,
        ]),
        email: this.formBuilder.nonNullable.control(email, [
          Validators.required,
          Validators.email,
        ]),
        mobileNo: this.formBuilder.nonNullable.control(mobileNo, [
          Validators.required,
          Validators.pattern(/^(0)\d{10}$/),
        ]),
      });
    });
  }

  closeDialog() {
    this.visible.update(() => false);
    this.isUpdateMode.update(() => false);
    this.userForm?.reset();
    this.userRepo.resetActiveId();
    this.activeUserId = undefined;
  }

  submitForm() {
    if (this.userForm?.invalid) {
      Object.values(this.userForm.controls).forEach((control) => {
        control.markAsTouched();
        control.markAsDirty();
      });
      return;
    }

    if (this.isUpdateMode()) {
      this.userRepo.updateUser(
        {
          ...this.userForm?.value,
          id: this.activeUserId,
        },
        this.closeDialog.bind(this),
      );
      return;
    }

    this.userRepo.createUser(this.userForm?.value, this.closeDialog.bind(this));
  }
}
