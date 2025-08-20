import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultistepComponent } from './multistep';

describe('MultistepComponent', () => {
  let component: MultistepComponent;
  let fixture: ComponentFixture<MultistepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultistepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultistepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
