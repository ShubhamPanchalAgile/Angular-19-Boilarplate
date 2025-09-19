import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MaterialModule } from '@core/modules/material.module';
import {
  FloatLabelType,
  MatFormFieldAppearance,
} from '@angular/material/form-field';

@Component({
  selector: 'app-render-password',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './render-password.component.html',
  styleUrls: ['./render-password.component.scss'],
})
export class RenderPasswordComponent {
  hide = false;

  group = input.required<FormGroup>();
  IAppearance = input<MatFormFieldAppearance>('outline');
  IFloatLabel = input<FloatLabelType>('auto');
  ILabel = input<string>('');
  Iplaceholder = input<string>('');
  IName = input.required<string>();

  constructor() {}
}
