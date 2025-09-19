import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MaterialModule } from '@core/modules/material.module';
import {
  FloatLabelType,
  MatFormFieldAppearance,
} from '@angular/material/form-field';

@Component({
  selector: 'app-render-input',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './render-input.component.html',
  styleUrls: ['./render-input.component.scss'],
})
export class RenderInputComponent {
  hide = true;

  group = input.required<FormGroup>();

  IType = input<string>('text');
  IHint = input<string>('');
  IGroupText = input<string>('');
  Iplaceholder = input<string>('');
  IName = input.required<string>();
  ILabel = input<string>('');
  IRequired = input<boolean>(false);
  IErrorMsg = input<string>('');
  Clear = input<boolean>(false);
  value = signal<string>('');
  Imaxlength = input<number | null>(null);
  ISuffixIcon = input<string>('');
  IPrefixIcon = input<string>('');
  IPrefixText = input<string>('');
  ISuffixText = input<string>('');
  IAppearance = input<MatFormFieldAppearance>('outline');
  IFloatLabel = input<FloatLabelType>('auto');

  constructor() {}
}
