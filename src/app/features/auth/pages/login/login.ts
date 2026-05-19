import { Component, inject, signal } from '@angular/core';
import { EyeIcon, EyeOffIcon } from '@shared/components/icons';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UrlBuilder } from '@shared/utils/url-builder';
import { NgIf } from '@angular/common';
import { Button,ButtonOptions, Label,LabelOptions, TextBox, TextboxOptions } from '@shared/components';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';
import { AuthUserModel } from '@core/models/authUser.model';

@Component({
  selector: 'app-login',
  imports: [Button, TextBox, Label, RouterLink, FormsModule, ReactiveFormsModule, EyeOffIcon],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly isSubmitting = signal(false);
  errorMessage = signal('');
  isShakeError = false;

  readonly form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.triggerFormShake();

      return;
    }
    this.isSubmitting.set(true);
    this.errorMessage.set('');

    const request = this.form.getRawValue();
    console.log(request);
    const { username, password } = this.form.getRawValue();

    this.authService.login(username, password).subscribe({
      next: (response) => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/dashboard';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.triggerFormShake();
        this.errorMessage.set(err.error.message);
      },
    });
  }
  triggerFormShake(): void {
    this.isShakeError = true;

    setTimeout(() => {
      this.isShakeError = true;
    }, 0);

    setTimeout(() => {
      this.isShakeError = false;
    }, 450);
  }

  togglePasswordVisibility() {}

  protected readonly ButtonOptions = new ButtonOptions({
    type: 'submit',
    variant: 'primary',
    cssClass: 'w-full py-3 rounded-xl text-base',
    label: 'Sign In',
  });

  protected readonly TextBoxOptions = new TextboxOptions({
    id: 'login-username',
    name: 'username',
    placeholder: 'Enter your username',
    required: true,
    withInputGroup: true,
    autocomplete: 'username',
    label: new LabelOptions({
      cssClass: 'block text-sm font-medium mb-2',
      forId: 'login-username',
      text: 'Username',
      required: true,
      // infoBadge: new InfoBadgeOptions({
      //   icon: '!',
      //   infoToolTipOptions: new InfoTooltipOptions({
      //     tip: 'Enter valid Username',
      //   }),
      // }),
    }),
  });

  protected readonly LabelOptions = new LabelOptions({
    forId: 'login-password',
    text: 'Password',
    cssClass: 'block text-sm font-medium mb-2',
    required: true,
  });

  protected readonly PasswordTextBoxOptions = new TextboxOptions({
    type: 'password',
    name: 'password',
    id: 'login-password',
    placeholder: 'Enter your password',
    required: true,
    autocomplete: 'current-password',
    inputClass: 'glass-input pr-12',
  });
  protected readonly UrlBuilder = UrlBuilder;
  protected readonly onsubmit = onsubmit;
}
