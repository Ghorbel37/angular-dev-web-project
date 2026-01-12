import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberEventModalComponent } from './member-event-modal.component';

describe('MemberEventModalComponent', () => {
  let component: MemberEventModalComponent;
  let fixture: ComponentFixture<MemberEventModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberEventModalComponent]
    });
    fixture = TestBed.createComponent(MemberEventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
