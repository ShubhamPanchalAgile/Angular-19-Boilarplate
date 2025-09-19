import { ChangeDetectorRef, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@core/modules/material.module';
import { RenderInputComponent } from '@shared/components/render-input/render-input.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '@core/models/common.interface';
import { RenderSelectComponent } from '@shared/components/render-select/render-select.component';
import { RenderDatepickerComponent } from '@shared/components/render-datepicker/render-datepicker.component';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    RenderInputComponent,
    RenderDatepickerComponent,
    RenderSelectComponent,
  ],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  private fb = inject(FormBuilder);

  form!: FormGroup;
  isLoading = false;
  isEdit: boolean = false;
  isView: boolean = false;

  constructor(
    private cd: ChangeDetectorRef,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      status: ['', Validators.required],
      joinDate: ['', Validators.required],
      department: ['', Validators.required],
    });

    if (data?.user) {
      const user: User = data.user;
      this.isEdit = true;
      this.form.patchValue({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        joinDate: user.joinDate,
        department: user.department,
      });
    }

    if (data?.disable) {
      this.isView = true;
      const user: User = data.user;
      this.form.patchValue({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        joinDate: user.joinDate,
        department: user.department,
      });
      this.form.disable();
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.dialogRef.close();
        this.cd.detectChanges();
      }, 1000);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
