import { take } from 'rxjs';

import { Injectable } from '@angular/core';
import { select, setProps } from '@ngneat/elf';

import { MetaService } from '../../services/meta/meta.service';
import { metaStore } from '../../stores/meta.store';
import { UserRepository } from '../user/user.repository';

@Injectable({
  providedIn: 'root',
})
export class MetaRepository {
  loading$ = metaStore.pipe(select((state) => state.loading));
  loaded$ = metaStore.pipe(select((state) => state.loaded));
  availableYears$ = metaStore.pipe(select((state) => state['availableYears']));
  tenantPerYear$ = metaStore.pipe(select((state) => state['tenantPerYear']));
  constructor(
    private metaService: MetaService,
    private userRepo: UserRepository,
  ) {}

  async loadMetaAvailableYears() {
    metaStore.update(setProps({ loading: true, loaded: false }));
    const availableYears = await this.metaService.getYears();
    metaStore.update(
      setProps({ loading: false, loaded: true, availableYears }),
    );
  }

  async loadMetaTenantPerYear(year = new Date().getFullYear().toString()) {
    metaStore.update(setProps({ loading: true, loaded: false }));
    const tenantPerYear = await this.metaService.getTenantPerYear(year);

    this.userRepo.entities$.pipe(take(1)).subscribe((users) => {
      metaStore.update(
        setProps({
          loading: false,
          loaded: true,
          tenantPerYear: users
            .filter((user) => tenantPerYear.includes(user.id))
            .map((user) => ({
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,
            })),
        }),
      );
    });
  }
}
