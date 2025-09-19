import {
  Component,
  effect,
  ElementRef,
  input,
  OnInit,
  output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MaterialModule } from '@core/modules/material.module';
import { CommonModule } from '@angular/common';
import {
  FloatLabelType,
  MatFormFieldAppearance,
} from '@angular/material/form-field';

export interface IOptions {
  name: string;
  value: string | number | boolean | null;
  reasonOfExemption?: Array<{
    name: string;
    value: string;
  }>;
}

@Component({
  selector: 'app-render-select',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './render-select.component.html',
  styleUrls: ['./render-select.component.scss'],
})
export class RenderSelectComponent implements OnInit {
  defaultOptions = [
    { name: '', value: '' },
    { name: 'Yes', value: 'Yes' },
    { name: 'No', value: 'No' },
  ];

  IHint = input<string>('');
  IOptions = input<IOptions[]>([]);
  IName = input.required<string>();
  group = input.required<FormGroup>();
  ILabel = input<string>('');
  IErrorMsg = input<string>('');
  IRequired = input<boolean>(false);
  IMultiple = input<boolean>(false);
  value = input<string>('');
  ISuffixIcon = input<string>('');
  IPrefixIcon = input<string>('');
  IPrefixText = input<string>('');
  ISuffixText = input<string>('');
  IAppearance = input<MatFormFieldAppearance>('outline');
  IFloatLabel = input<FloatLabelType>('auto');
  IOnChange = output<any>();
  hideNoOption = input<boolean>(false);
  isShowSelectAll = input<boolean>(false);
  isValueName = input<boolean>(false);

  options: IOptions[] = this.IOptions()?.length
    ? this.IOptions()
    : this.defaultOptions;

  @ViewChildren('label') labels!: QueryList<ElementRef>;

  constructor() {
    effect(() => {
      // Anytime IOptions changes → this runs
      this.options = this.IOptions()?.length
        ? this.IOptions()
        : this.defaultOptions;

      if (this.hideNoOption()) {
        this.updateOptions();
      }
    });
  }

  ngOnInit(): void {
    this.options = this.IOptions() || this.defaultOptions;
    if (this.hideNoOption()) {
      this.updateOptions();
    }
  }

  updateOptions(): void {
    this.options = this.defaultOptions.filter((option) => option.name !== 'No');
  }

  onSelectionChange(event: any) {
    const selectedValues = event.value;
    const control = this.group().get(this.IName());

    const allOption = 'all';
    const allValues = this.options.map((opt) =>
      this.isValueName() ? opt.name : opt.value,
    );

    // Select All was clicked
    if (selectedValues.includes(allOption)) {
      if (!this.isAllSelected()) {
        control?.setValue([...allValues]);
      } else {
        control?.setValue([]);
      }
    }
  }

  isAllSelected(): boolean {
    const selected = this.group().get(this.IName())?.value;
    if (!Array.isArray(selected)) return false;
    const allValues = this.options.map((opt) =>
      this.isValueName() ? opt.name : opt.value,
    );
    return allValues.every((val) => selected.includes(val));
  }

  setTooltip(label: any) {
    this.labels.forEach((label) => {
      const el = label.nativeElement as HTMLElement;
      const overflow = el.scrollWidth > el.clientWidth;
      el.dataset['overflow'] = String(overflow);
    });
  }
}
