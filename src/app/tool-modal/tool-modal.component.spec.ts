import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolModalComponent } from './tool-modal.component';

describe('ToolModalComponent', () => {
  let component: ToolModalComponent;
  let fixture: ComponentFixture<ToolModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolModalComponent]
    });
    fixture = TestBed.createComponent(ToolModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
