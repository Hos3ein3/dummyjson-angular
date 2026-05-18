// shared/forms/validators/validation-messages.ts
export const VALIDATION_MESSAGES: Record<string, (error?: any) => string> = {
  required: () => 'This field is required.',
  minlength: (e) => `Minimum ${e.requiredLength} characters required.`,
  maxlength: (e) => `Maximum ${e.requiredLength} characters allowed.`,
  email: () => 'Please enter a valid email address.',
  strongPassword: () =>
    'Password must contain uppercase, lowercase, number, and special character.',
};
