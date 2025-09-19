import { CommonModule } from '@angular/common';
import { Component, input, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MaterialModule } from '../../../core/modules/material.module';
import {
  FloatLabelType,
  MatFormFieldAppearance,
} from '@angular/material/form-field';

@Component({
  selector: 'app-render-date-range-picker',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './render-date-range-picker.component.html',
  styleUrls: ['./render-date-range-picker.component.scss'],
})
export class RenderDateRangePickerComponent implements OnInit {
  IAppearance = input<MatFormFieldAppearance>('outline');
  IFloatLabel = input<FloatLabelType>('auto');
  group = input.required<FormGroup>();
  ILabel = input<string>('');
  IHint = input<string>('MM/DD/YYYY');
  maxDate = input<Date>(new Date(1950, 0, 1));

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor() {}

  ngOnInit(): void {}
}
