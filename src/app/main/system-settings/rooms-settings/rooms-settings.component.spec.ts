import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsSettingsComponent } from './rooms-settings.component';

describe('RoomsSettingsComponent', () => {
  let component: RoomsSettingsComponent;
  let fixture: ComponentFixture<RoomsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
