import { Unsubscribe } from 'firebase/firestore';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { PushPipe } from '@ngrx/component';

import { AuthRepoService } from '../core/auth/auth-repo.service';
import { ROLES } from '../enums/roles';
import { TopmenuComponent } from '../shared/topmenu/topmenu.component';
import { UserRepository } from '../stores/user/user.repository';
import { WaterConsumptionRepository } from '../stores/water-consumption/water-consumption.repository';

@Component({
  selector: 'ds-main',
  imports: [
    TopmenuComponent,
    RouterOutlet,
    CommonModule,
    PushPipe,
    ProgressSpinnerModule,
    BlockUIModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit, OnDestroy {
  protected loggedIn$: Observable<boolean>;
  protected loading$: Observable<boolean | undefined>;
  protected loaded$: Observable<boolean | undefined>;
  protected authRepoService = inject(AuthRepoService);
  readonly currentUser = toSignal(this.authRepoService.user$);

  protected unsubscribe: Unsubscribe | undefined;

  constructor(
    private waterConsumptionRepo: WaterConsumptionRepository,
    private userRepo: UserRepository,
  ) {
    this.loggedIn$ = this.authRepoService.loggedIn$;
    this.loading$ = this.waterConsumptionRepo.loading$;
    this.loaded$ = this.waterConsumptionRepo.loaded$;
  }

  ngOnInit(): void {
    const role = this.currentUser()?.role;
    this.userRepo.loadAllUsersRecord();

    if (role === ROLES.ADMIN) {
      this.unsubscribe =
        this.waterConsumptionRepo.getAllWaterConsumptionRecord();
    }

    if (role === ROLES.TENANT) {
      this.unsubscribe = this.waterConsumptionRepo.getWaterConsumptionRecord();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe!();
  }
}
