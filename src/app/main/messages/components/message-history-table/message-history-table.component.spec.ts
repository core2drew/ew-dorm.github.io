import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageHistoryTableComponent } from './message-history-table.component';

describe('MessageHistoryTableComponent', () => {
  let component: MessageHistoryTableComponent;
  let fixture: ComponentFixture<MessageHistoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageHistoryTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
