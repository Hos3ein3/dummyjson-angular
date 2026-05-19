import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UrlBuilder } from '@shared/utils/url-builder';
import { Button, ButtonOptions, LabelOptions, TextBox, TextboxOptions } from '@shared/components';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [RouterLink,  TextBox, ReactiveFormsModule, Button],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  private readonly fb = inject(FormBuilder);
  readonly isSubmitting = signal(false);
  errorMessage = '';
  isShakeError = false;

  readonly form = this.fb.nonNullable.group({
    firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(100)],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatPassword: ['', [Validators.required, Validators.minLength(6)]],
  });
  onSubmit(): void {
    console.log('Before validation');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log('In validation');
      this.triggerFormShake();

      return;
    }
    console.log('After validation');
    this.isSubmitting.set(true);
    this.errorMessage = '';

    const request = this.form.getRawValue();
    console.log(request);
  }
  triggerFormShake(): void {
    this.isShakeError = true;
    console.log('in shaking');
    setTimeout(() => {
      this.isShakeError = true;
    }, 0);

    setTimeout(() => {
      this.isShakeError = false;
    }, 450);
  }

  protected readonly UrlBuilder = UrlBuilder;

  protected readonly firstNameOptions = new TextboxOptions({
    placeholder: 'John',
    name: 'firstName',
    label: new LabelOptions({
      required: true,
      text: 'First Name',
    }),
  });

  protected readonly lastNameOptions = new TextboxOptions({
    placeholder: 'Doe',
    name: 'lastname',
    label: new LabelOptions({ required: true, text: 'Last Name' }),
  });

  protected readonly emailOptions = new TextboxOptions({
    placeholder: 'John.Doe@Example.com',
    required: true,
    type: 'email',
    label: new LabelOptions({ required: true, text: 'Email Address' }),
  });

  protected readonly usernameOptions = new TextboxOptions({
    placeholder: 'JohnDoe',
    required: true,
    type: 'text',
    label: new LabelOptions({ required: true, text: 'Username' }),
  });

  protected readonly passwordOptions = new TextboxOptions({
    placeholder: 'Password',
    required: true,
    type: 'password',
    label: new LabelOptions({ required: true, text: 'Password' }),
  });
  protected readonly repeatPasswordOptions = new TextboxOptions({
    placeholder: 'Repeat your password',
    required: true,
    type: 'password',
    label: new LabelOptions({ required: true, text: 'Repeat Password' }),
  });

  protected readonly submitButtonOptions = new ButtonOptions({
    type: 'submit',
    variant: 'primary',
    size: 'lg',
    cssClass: 'w-full py-3 rounded-xl text-base',
  });
}
