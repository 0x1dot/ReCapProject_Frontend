import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartshopComponent } from './cartshop.component';

describe('CartshopComponent', () => {
  let component: CartshopComponent;
  let fixture: ComponentFixture<CartshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartshopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
