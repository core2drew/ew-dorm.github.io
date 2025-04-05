import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterPriceSettingsComponent } from './water-price-settings.component';

describe('WaterPriceSettingsComponent', () => {
  let component: WaterPriceSettingsComponent;
  let fixture: ComponentFixture<WaterPriceSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaterPriceSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaterPriceSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
