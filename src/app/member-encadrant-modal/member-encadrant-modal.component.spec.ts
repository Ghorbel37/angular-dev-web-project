import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberEncadrantModalComponent } from './member-encadrant-modal.component';

describe('MemberEncadrantComponent', () => {
  let component: MemberEncadrantModalComponent;
  let fixture: ComponentFixture<MemberEncadrantModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberEncadrantModalComponent]
    });
    fixture = TestBed.createComponent(MemberEncadrantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
