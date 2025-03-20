import { Unsubscribe } from 'firebase/auth';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LetDirective, PushPipe } from '@ngrx/component';

import { AuthRepoService } from './core/auth/auth-repo.service';
import { ROLES } from './enums/roles';
import { TopmenuComponent } from './shared/topmenu/topmenu.component';
import { WaterConsumptionRepository } from './stores/water-consumption/water-consumption.repository';

@Component({
  selector: 'ds-root',
  imports: [
    RouterOutlet,
    ToastModule,
    TopmenuComponent,
    CommonModule,
    LetDirective,
    PushPipe,
    ProgressSpinnerModule,
    BlockUIModule,
  ],
  providers: [AuthRepoService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  protected loggedIn$: Observable<boolean>;
  protected loading$: Observable<boolean | undefined>;
  protected loaded$: Observable<boolean | undefined>;
  protected unsubscribe: Unsubscribe | undefined;

  constructor(
    private authRepoService: AuthRepoService,
    private waterConsumptionRepo: WaterConsumptionRepository,
  ) {
    this.loggedIn$ = this.authRepoService.loggedIn$;
    this.loading$ = this.waterConsumptionRepo.loading$;
    this.loaded$ = this.waterConsumptionRepo.loaded$;
  }
  ngOnInit(): void {
    const role = this.authRepoService.currentUser()?.role;

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
