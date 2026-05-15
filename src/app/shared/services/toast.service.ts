import { Injectable, signal } from '@angular/core';
import { ToastItem, ToastType } from '@shared/components/toast/toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private nextId = 1;
  toasts = signal<ToastItem[]>([]);

  show(message: string, type: ToastType = 'success', duration = 3000) {
    const id = this.nextId++;

    const toast: ToastItem = {
      id,
      message,
      type,
      duration,
      removing: false,
    };

    this.toasts.update((items) => [...items, toast]);

    setTimeout(() => {
      this.toasts.update((items) => items.map((t) => (t.id === id ? { ...t, removing: true } : t)));

      setTimeout(() => {
        this.toasts.update((items) => items.filter((t) => t.id !== id));
      }, 300);
    }, duration);
  }

  success(message: string, duration = 3000) {
    this.show(message, 'success', duration);
  }

  error(message: string, duration = 4000) {
    this.show(message, 'error', duration);
  }

  info(message: string, duration = 5000) {
    this.show(message, 'info', duration);
  }

  warning(message: string, duration = 6000) {
    this.show(message, 'warning', duration);
  }

  remove(id: number) {
    const target = this.toasts().find((t) => t.id === id);
    if (!target || target.removing) return;

    this.toasts.update((items) => items.map((t) => (t.id === id ? { ...t, removing: true } : t)));

    setTimeout(() => {
      this.toasts.update((items) => items.filter((t) => t.id !== id));
    }, 300);
  }
}
