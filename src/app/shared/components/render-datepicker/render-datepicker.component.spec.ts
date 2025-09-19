import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderDatepickerComponent } from './render-datepicker.component';

describe('RenderDatepickerComponent', () => {
  let component: RenderDatepickerComponent;
  let fixture: ComponentFixture<RenderDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RenderDatepickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RenderDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
