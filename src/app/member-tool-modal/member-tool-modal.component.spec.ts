import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberToolModalComponent } from './member-tool-modal.component';

describe('MemberToolModalComponent', () => {
  let component: MemberToolModalComponent;
  let fixture: ComponentFixture<MemberToolModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberToolModalComponent]
    });
    fixture = TestBed.createComponent(MemberToolModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
