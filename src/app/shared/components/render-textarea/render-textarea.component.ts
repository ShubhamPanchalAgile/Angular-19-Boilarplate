import { CommonModule } from '@angular/common';
import { Component, input, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MaterialModule } from '../../../core/modules/material.module';
import {
  FloatLabelType,
  MatFormFieldAppearance,
} from '@angular/material/form-field';

@Component({
  selector: 'app-render-textarea',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './render-textarea.component.html',
  styleUrls: ['./render-textarea.component.scss'],
})
export class RenderTextareaComponent {
  IAppearance = input<MatFormFieldAppearance>('outline');
  IFloatLabel = input<FloatLabelType>('auto');
  group = input.required<FormGroup>();
  ILabel = input<string>('');
  Iplaceholder = input<string>('');
  IName = input.required<string>();
  IHint = input<string>('');
  Imaxlength = input<number | null>(null);
  IErrorMsg = input<string>('');
  IClass = input<string>('');
  isHide = input<boolean>(false);

  constructor() {}
}
