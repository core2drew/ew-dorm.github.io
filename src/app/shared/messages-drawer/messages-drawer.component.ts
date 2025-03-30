import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { DrawerModule } from 'primeng/drawer';

import { CommonModule } from '@angular/common';
import { Component, model, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AuthRepoService } from '../../core/auth/auth-repo.service';
import { SmsMesssage } from '../../services/sms/sms.model';
import { SmsService } from '../../services/sms/sms.service';

@UntilDestroy()
@Component({
  selector: 'ds-messages-drawer',
  imports: [DrawerModule, CardModule, CommonModule, ChipModule],
  templateUrl: './messages-drawer.component.html',
  styleUrl: './messages-drawer.component.scss',
  providers: [SmsService],
})
export class MessagesDrawerComponent implements OnInit, OnDestroy {
  isVisible = model<boolean>(false);
  messages: SmsMesssage[] = [];
  hasMessage: boolean = false;

  constructor(
    private smsService: SmsService,
    private authRepo: AuthRepoService,
  ) {}

  ngOnInit(): void {
    this.smsService.data$.pipe(untilDestroyed(this)).subscribe((messages) => {
      this.messages = messages || [];
      this.hasMessage = !!messages?.length;
    });

    const uid = this.authRepo.currentUser()?.uid as string;
    this.smsService.getMessages(uid);
  }

  ngOnDestroy(): void {
    this.smsService.unsubscribe!();
  }
}
