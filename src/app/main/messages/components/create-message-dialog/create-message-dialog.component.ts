import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { TextareaModule } from 'primeng/textarea';
import { BehaviorSubject, map } from 'rxjs';

import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  model,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MessageRepository } from '../../../../repositories/message/message.repository';
import { SmsService } from '../../../../services/sms/sms.service';
import { User } from '../../../../shared/models/user.model';
import { Message } from '../../models/message.model';

@Component({
  selector: 'ds-create-message-dialog',
  imports: [
    DialogModule,
    FormsModule,
    ButtonModule,
    TextareaModule,
    FloatLabelModule,
    MultiSelectModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './create-message-dialog.component.html',
  styleUrl: './create-message-dialog.component.scss',
  providers: [SmsService],
})
export class CreateMessageDialogComponent implements OnInit {
  @Output() send = new EventEmitter<Message>();
  @Input() userDataSource: User[] | undefined;
  visible = model<boolean>(false);
  sending$ = new BehaviorSubject<boolean>(false);
  messageForm: FormGroup | undefined;

  constructor(
    private messageRepo: MessageRepository,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      recipientsIds: this.formBuilder.nonNullable.control(
        [],
        [Validators.required],
      ),
      message: this.formBuilder.nonNullable.control('', [Validators.required]),
    });
  }

  get recipientsIds() {
    return this.messageForm?.controls['recipientsIds'];
  }

  get message() {
    return this.messageForm?.controls['message'];
  }

  closeDialog() {
    this.visible.update(() => false);
    this.messageForm?.reset();
  }

  sendMessage() {
    if (this.messageForm?.invalid) {
      return;
    }

    const { message, recipientsIds } = this.messageForm?.value;
    const userContacts = this.userDataSource!.filter((user) =>
      recipientsIds?.includes(user.id),
    ).map(({ id: uid, mobileNo }) => ({
      uid,
      mobileNo: mobileNo.replace(/^(0)/g, '+63'),
    }));
    this.messageRepo.createMessage(
      { message, userContacts },
      this.closeDialog.bind(this),
    );
  }
}
