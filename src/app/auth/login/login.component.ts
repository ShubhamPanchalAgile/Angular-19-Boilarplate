import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../core/modules/material.module';
import { RenderInputComponent } from '../../shared/components/render-input/render-input.component';
import { RenderPasswordComponent } from '../../shared/components/render-password/render-password.component';
import { NotificationService } from '../../core/services/notification.service';
import { AuthSignal } from '../../signals/auth.signal';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    RenderInputComponent,
    RenderPasswordComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authSignal = inject(AuthSignal);

  private notificationService = inject(NotificationService);

  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;
  constructor(private cd: ChangeDetectorRef) {
    this.registerForm = this.fb.group({
      email: ['test@admin.com', [Validators.required, Validators.email]],
      password: ['Test@123', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authSignal.setLoading(true);
      this.isLoading = true;

      setTimeout(() => {
        const user = {
          id: crypto.randomUUID(),
          email: this.registerForm.value.email,
          name: this.registerForm.value.name ?? 'Guest',
          role: 'user',
        };

        this.authSignal.login(user, 'fake-jwt-token');
        this.notificationService.success(
          'Account created successfully! Please sign in.',
        );
        this.router.navigate(['/admin/dashboard']);

        this.isLoading = false;
        this.cd.detectChanges(); // 👈 tells Angular to re-check
      }, 1000);
    }
  }

  onChangeDepartment(e: any) {
    console.log(e);
  }
}
