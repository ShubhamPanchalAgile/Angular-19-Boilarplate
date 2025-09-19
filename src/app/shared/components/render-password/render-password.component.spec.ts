import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderPasswordComponent } from './render-password.component';

describe('RenderPasswordComponent', () => {
  let component: RenderPasswordComponent;
  let fixture: ComponentFixture<RenderPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RenderPasswordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RenderPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
