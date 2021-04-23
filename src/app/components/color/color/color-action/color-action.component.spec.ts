import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorActionComponent } from './color-action.component';

describe('ColorActionComponent', () => {
  let component: ColorActionComponent;
  let fixture: ComponentFixture<ColorActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
