import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

import { Component, model, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'ds-users-dialog',
  imports: [DialogModule, InputTextModule, ButtonModule, ReactiveFormsModule],
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
      recipientsIds: this.formBuilder.nonNullable.control(
        [],
        [Validators.required],
      ),
      message: this.formBuilder.nonNullable.control('', [Validators.required]),
    });
  }

  closeDialog() {
    this.visible.update(() => false);
    this.isUpdateMode.update(() => false);
  }

  submitForm() {
    if (this.userForm?.invalid) {
      return;
    }

    console.log(this.userForm?.value);
  }
}
