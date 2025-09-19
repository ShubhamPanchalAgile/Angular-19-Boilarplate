import {
  Component,
  EventEmitter,
  input,
  Input,
  OnInit,
  output,
  Output,
  signal,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MaterialModule } from '@core/modules/material.module';
import { CommonModule } from '@angular/common';
import {
  FloatLabelType,
  MatFormFieldAppearance,
} from '@angular/material/form-field';

@Component({
  selector: 'app-render-datepicker',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './render-datepicker.component.html',
  styleUrls: ['./render-datepicker.component.scss'],
})
export class RenderDatepickerComponent {
  IOnChange = output<any>();
  group = input.required<FormGroup>();
  IAppearance = input<MatFormFieldAppearance>('outline');
  IFloatLabel = input<FloatLabelType>('auto');
  ILabel = input<string>('');
  IRequired = input<boolean>(false);
  IName = input.required<string>();
  IHint = input<string>('MM/DD/YYYY');
  IErrorMsg = input<string>('');
  value = signal<string>('');
  ISuffixIcon = input<string>('');
  IPrefixIcon = input<string>('');
  maxDate = input<Date>(new Date(1950, 0, 1));

  constructor() {}
}
