import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarActionComponent } from './car-action.component';

describe('CarActionComponent', () => {
  let component: CarActionComponent;
  let fixture: ComponentFixture<CarActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
