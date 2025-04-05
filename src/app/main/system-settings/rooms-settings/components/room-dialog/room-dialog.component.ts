import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { combineLatest, map, Observable, of } from 'rxjs';

import { CommonModule } from '@angular/common';
import {
  Component,
  model,
  OnChanges,
  OnInit,
  Signal,
  SimpleChanges,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PushPipe } from '@ngrx/component';

import { UserRepository } from '../../../../../repositories/user/user.repository';
import { User } from '../../../../../shared/models/user.model';
import { Room } from '../../models/room.model';
import { RoomSettingsRepositoryService } from '../../store/room-settings.repository';

@Component({
  selector: 'ds-room-dialog',
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
    SelectModule,
  ],
  templateUrl: './room-dialog.component.html',
  styleUrl: './room-dialog.component.scss',
})
export class RoomDialogComponent implements OnInit, OnChanges {
  isUpdateMode = model<boolean>(false);
  visible = model<boolean>(false);
  roomForm: FormGroup | undefined;
  loading$: Observable<boolean | undefined> | undefined;
  $activeRoom: Signal<Room | undefined> | undefined;
  userDataSource$: Observable<User[]> = of([]);
  $rooms: Signal<Room[] | undefined> | undefined;

  get title() {
    return this.isUpdateMode() ? 'Update room' : 'Create room';
  }

  get buttonLabel() {
    return this.isUpdateMode() ? 'Update' : 'Create';
  }

  get showAssignTenant() {
    return this.isUpdateMode();
  }

  get roomField() {
    return this.roomForm?.get('name');
  }

  get uidField() {
    return this.roomForm?.get('uid');
  }

  constructor(
    private formBuilder: FormBuilder,
    private roomSettingsRepo: RoomSettingsRepositoryService,
    private userRepo: UserRepository,
  ) {
    this.userDataSource$ = combineLatest({
      users: this.userRepo.entities$,
      rooms: this.roomSettingsRepo.entities$,
    }).pipe(
      map(({ users, rooms }) => {
        return users;
      }),
    );
    this.$activeRoom = toSignal(this.roomSettingsRepo.activeUser$);
    this.$rooms = toSignal(this.roomSettingsRepo.entities$);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isUpdateMode']) {
      if (this.isUpdateMode()) {
        this.roomForm?.controls['id'].setValue(this.$activeRoom!()?.id);
        this.roomForm?.controls['name'].setValue(this.$activeRoom!()?.name);
        this.roomForm?.controls['uid'].setValue(this.$activeRoom!()?.uid);
      }
    }
  }

  ngOnInit(): void {
    this.roomForm = this.formBuilder.group({
      id: this.formBuilder.nonNullable.control(''),
      name: this.formBuilder.nonNullable.control('', [Validators.required]),
      uid: this.formBuilder.nonNullable.control(''),
    });
  }

  closeDialog() {
    this.visible.update(() => false);
    this.isUpdateMode.update(() => false);
    this.roomForm?.reset();
  }

  submitForm() {
    if (this.roomForm?.invalid) {
      Object.values(this.roomForm.controls).forEach((control) => {
        control.markAsTouched();
        control.markAsDirty();
      });
      return;
    }

    if (this.isUpdateMode()) {
      this.roomSettingsRepo.updateRoom(
        this.roomForm?.value,
        this.closeDialog.bind(this),
      );
      return;
    }

    this.roomSettingsRepo.createNewRoom(
      this.roomForm?.value,
      this.closeDialog.bind(this),
    );
  }
}
