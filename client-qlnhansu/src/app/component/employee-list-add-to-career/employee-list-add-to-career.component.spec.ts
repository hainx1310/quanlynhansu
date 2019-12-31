import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListAddToCareerComponent } from './employee-list-add-to-career.component';

describe('EmployeeListAddToCareerComponent', () => {
  let component: EmployeeListAddToCareerComponent;
  let fixture: ComponentFixture<EmployeeListAddToCareerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeListAddToCareerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListAddToCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
