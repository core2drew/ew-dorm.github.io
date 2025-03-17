import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentHistoryTableComponent } from './payment-history-table.component';

describe('PaymentHistoryTableComponent', () => {
  let component: PaymentHistoryTableComponent;
  let fixture: ComponentFixture<PaymentHistoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentHistoryTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
