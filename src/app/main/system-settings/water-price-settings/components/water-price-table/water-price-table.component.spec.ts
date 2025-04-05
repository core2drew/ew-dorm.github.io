import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterPriceTableComponent } from './water-price-table.component';

describe('WaterPriceTableComponent', () => {
  let component: WaterPriceTableComponent;
  let fixture: ComponentFixture<WaterPriceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaterPriceTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaterPriceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
