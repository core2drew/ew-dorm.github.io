import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterPriceDialogComponent } from './water-price-dialog.component';

describe('WaterPriceDialogComponent', () => {
  let component: WaterPriceDialogComponent;
  let fixture: ComponentFixture<WaterPriceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaterPriceDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaterPriceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
