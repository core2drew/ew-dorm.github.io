import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesDrawerComponent } from './messages-drawer.component';

describe('MessagesDrawerComponent', () => {
  let component: MessagesDrawerComponent;
  let fixture: ComponentFixture<MessagesDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
