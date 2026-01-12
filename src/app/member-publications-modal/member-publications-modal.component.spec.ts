import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPublicationsModalComponent } from './member-publications-modal.component';

describe('MemberPublicationsComponent', () => {
  let component: MemberPublicationsModalComponent;
  let fixture: ComponentFixture<MemberPublicationsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberPublicationsModalComponent]
    });
    fixture = TestBed.createComponent(MemberPublicationsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
