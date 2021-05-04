import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentaddComponent } from './rentadd.component';

describe('RentaddComponent', () => {
  let component: RentaddComponent;
  let fixture: ComponentFixture<RentaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
