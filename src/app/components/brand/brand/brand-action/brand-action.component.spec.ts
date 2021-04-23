import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandActionComponent } from './brand-action.component';

describe('BrandActionComponent', () => {
  let component: BrandActionComponent;
  let fixture: ComponentFixture<BrandActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
