import { MessageService } from 'primeng/api';

import { Injectable } from '@angular/core';
import { select, setProps } from '@ngneat/elf';
import {
  selectActiveEntity,
  selectAllEntities,
  setActiveId,
  upsertEntities,
} from '@ngneat/elf-entities';

import { Room } from '../models/room.model';
import { RoomSettingsService } from '../service/room-settings.service';
import { roomSettingsStore } from './room-settings.store';

@Injectable({
  providedIn: 'root',
})
export class RoomSettingsRepositoryService {
  loading$ = roomSettingsStore.pipe(select((state) => state.loading));
  loaded$ = roomSettingsStore.pipe(select((state) => state.loaded));
  entities$ = roomSettingsStore.pipe(selectAllEntities());
  activeUser$ = roomSettingsStore.pipe(selectActiveEntity());

  constructor(
    private messageService: MessageService,
    private roomSettingsService: RoomSettingsService,
  ) {}

  setActiveRoomById(id: string) {
    roomSettingsStore.update(setActiveId(id));
  }

  async loadAllRooms() {
    roomSettingsStore.update(setProps({ loading: true, loaded: false }));
    const data = await this.roomSettingsService.getRooms();
    roomSettingsStore.update(
      upsertEntities(data),
      setProps({ loading: false, loaded: true }),
    );
  }

  async createNewRoom(data: Room, callback: Function) {
    roomSettingsStore.update(setProps({ loading: true, loaded: false }));
    try {
      const doc = await this.roomSettingsService.createRoom(data);
      roomSettingsStore.update(
        upsertEntities({
          ...data,
          ...doc,
        } as Room),
      );
      this.messageService.add({
        severity: 'info',
        summary: 'Room created',
        detail: 'New room has been successfully created',
        life: 3000,
      });
    } catch (e) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Uh oh! something went wrong.',
        life: 3000,
      });
    } finally {
      callback();
      roomSettingsStore.update(setProps({ loading: false, loaded: true }));
    }
  }

  async updateRoom(data: Room, callback: Function) {
    roomSettingsStore.update(setProps({ loading: true, loaded: false }));
    try {
      const doc = await this.roomSettingsService.updateRoom(data);
      roomSettingsStore.update(
        upsertEntities({
          ...data,
          ...doc,
        } as Room),
      );
      this.messageService.add({
        severity: 'info',
        summary: 'Room updated',
        detail: 'New room has been successfully updated',
        life: 3000,
      });
    } catch (e) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Uh oh! something went wrong.',
        life: 3000,
      });
    } finally {
      callback();
      roomSettingsStore.update(setProps({ loading: false, loaded: true }));
    }
  }
}
