import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerModalComponent } from './career-modal.component';

describe('CareerModalComponent', () => {
  let component: CareerModalComponent;
  let fixture: ComponentFixture<CareerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
