import { Injectable, signal } from '@angular/core';
import { BreadcrumbItem } from '@shared/models/breadcrumb.model';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  items = signal<BreadcrumbItem[]>([]);

  setItems(items: BreadcrumbItem[]) {
    this.items.set(items);
  }
}
