// shared/ui/modal/services/modal.service.ts
import { Injectable, signal } from '@angular/core';
import { ModalAction, ModalOptions, ModalRef } from '@shared/components/modal/modal';
import { ButtonOptions } from '@shared/components/button/button';

interface ActiveModalState<T = any> {
  options: ModalOptions<T>;
  ref: ModalRef<T>;
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  private readonly _activeModal = signal<ActiveModalState | null>(null);
  readonly activeModal = this._activeModal.asReadonly();

  open<T = any>(options: ModalOptions<T>): ModalRef<T> {
    const ref = new ModalRef<T>();
    this._activeModal.set({ options, ref });
    return ref;
  }

  close<T = any>(result: any = null): void {
    const modal = this._activeModal();
    if (!modal) return;

    modal.ref.close(result);
    this._activeModal.set(null);
  }

  confirm(options?: Partial<ModalOptions>): ModalRef {
    const merged = new ModalOptions({
      title: 'Are you sure?',
      message: 'This action cannot be undone.',
      size: 'sm',
      actions: [
        new ModalAction({
          id: 'cancel',
          button: new ButtonOptions({
            label: 'Cancel',
            variant: 'secondary',
          }),
          result: { confirmed: false, actionId: 'cancel' },
        }),
        new ModalAction({
          id: 'confirm',
          button: new ButtonOptions({
            label: 'Confirm',
            variant: 'danger',
          }),
          result: { confirmed: true, actionId: 'confirm' },
        }),
      ],
      ...options,
    });

    return this.open(merged);
  }

  closeByBackdrop(): void {
    const modal = this._activeModal();
    if (!modal?.options.closeOnBackdrop) return;

    this.close({ confirmed: false, actionId: 'backdrop' });
  }

  closeByEscape(): void {
    const modal = this._activeModal();
    if (!modal?.options.closeOnEscape) return;

    this.close({ confirmed: false, actionId: 'escape' });
  }

  runAction(action: ModalAction): void {
    if (action.disabled) return;

    if (action.closeOnClick) {
      this.close(action.result ?? { confirmed: true, actionId: action.id });
    }
  }
}
