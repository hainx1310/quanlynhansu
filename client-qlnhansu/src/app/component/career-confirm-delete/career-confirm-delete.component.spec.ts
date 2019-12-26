import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerConfirmDeleteComponent } from './career-confirm-delete.component';

describe('CareerConfirmDeleteComponent', () => {
  let component: CareerConfirmDeleteComponent;
  let fixture: ComponentFixture<CareerConfirmDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerConfirmDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerConfirmDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
