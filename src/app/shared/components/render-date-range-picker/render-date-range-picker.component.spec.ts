import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderDateRangePickerComponent } from './render-date-range-picker.component';

describe('RenderDateRangePickerComponent', () => {
  let component: RenderDateRangePickerComponent;
  let fixture: ComponentFixture<RenderDateRangePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RenderDateRangePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RenderDateRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
