import { Injectable } from '@angular/core';
import { select, setProps } from '@ngneat/elf';

import { MetaService } from '../../services/meta/meta.service';
import { metaStore } from '../../stores/meta.store';

@Injectable({
  providedIn: 'root',
})
export class MetaRepository {
  loading$ = metaStore.pipe(select((state) => state.loading));
  loaded$ = metaStore.pipe(select((state) => state.loaded));
  availableYears$ = metaStore.pipe(select((state) => state['availableYears']));

  constructor(private metaService: MetaService) {}

  async loadMetaData() {
    metaStore.update(setProps({ loading: true, loaded: false }));
    const availableYears = await this.metaService.getYears();

    metaStore.update(
      setProps({ loading: false, loaded: true, availableYears }),
    );
  }
}
