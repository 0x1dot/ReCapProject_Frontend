import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlrentalComponent } from './controlrental.component';

describe('ControlrentalComponent', () => {
  let component: ControlrentalComponent;
  let fixture: ComponentFixture<ControlrentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlrentalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlrentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
