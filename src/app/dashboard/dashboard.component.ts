import { CardModule } from 'primeng/card';

import { Component } from '@angular/core';

import { AuthRepoService } from '../core/auth/auth-repo.service';

@Component({
  selector: 'ds-dashboard',
  imports: [CardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private authRepoService: AuthRepoService) {
    this.authRepoService.user$.subscribe((user) => console.log(user));
  }

  ngOnInit() {}
}
