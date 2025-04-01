import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

import { Component, model, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'ds-users-dialog',
  imports: [
    DialogModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    FormsModule,
  ],
  templateUrl: './users-dialog.component.html',
  styleUrl: './users-dialog.component.scss',
})
export class UsersDialogComponent implements OnInit {
  isUpdateMode = model<boolean>(false);
  visible = model<boolean>(false);
  userForm: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder) {}

  get title() {
    return this.isUpdateMode() ? 'Update user' : 'Create user';
  }

  get buttonLabel() {
    return this.isUpdateMode() ? 'Update' : 'Create';
  }

  ngOnInit(): void {
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
        Validators.pattern(/^([+]d{2})?d{10}$/),
      ]),
    });
  }

  closeDialog() {
    this.visible.update(() => false);
    this.isUpdateMode.update(() => false);
  }

  submitForm() {
    console.log(this.userForm?.get('mobileNo')?.errors);
    console.log(this.userForm?.value);
  }
}
