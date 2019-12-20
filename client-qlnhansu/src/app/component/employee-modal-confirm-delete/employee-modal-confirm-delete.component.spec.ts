import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeModalConfirmDeleteComponent } from './employee-modal-confirm-delete.component';

describe('EmployeeModalConfirmDeleteComponent', () => {
  let component: EmployeeModalConfirmDeleteComponent;
  let fixture: ComponentFixture<EmployeeModalConfirmDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeModalConfirmDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeModalConfirmDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
