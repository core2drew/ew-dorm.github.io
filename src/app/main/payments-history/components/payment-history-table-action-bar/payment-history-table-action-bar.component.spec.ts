import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentHistoryTableActionBarComponent } from './payment-history-table-action-bar.component';

describe('PaymentHistoryTableActionBarComponent', () => {
  let component: PaymentHistoryTableActionBarComponent;
  let fixture: ComponentFixture<PaymentHistoryTableActionBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentHistoryTableActionBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentHistoryTableActionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
