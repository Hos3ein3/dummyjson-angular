import { Component, output } from '@angular/core';

export type SortOrder = 'asc' | 'desc' | null;

export interface SortChangedEvent {
  sortBy: string | null;
  order: SortOrder;
}

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.html',
  styleUrl: './sorting.css',
})
export class Sorting {
  sortChanged = output<SortChangedEvent>();

  onSortChange(value: string) {
    console.log('onSortChanged:'+ value );
    switch (value) {
      case 'title-asc':
        this.sortChanged.emit({ sortBy: 'title', order: 'asc' });
        break;
      case 'title-desc':
        this.sortChanged.emit({ sortBy: 'title', order: 'desc' });
        break;
      case 'price-asc':
        this.sortChanged.emit({ sortBy: 'price', order: 'asc' });
        break;
      case 'price-desc':
        this.sortChanged.emit({ sortBy: 'price', order: 'desc' });
        break;
      case 'rating-desc':
        this.sortChanged.emit({ sortBy: 'rating', order: 'desc' });
        break;
      default:
        this.sortChanged.emit({ sortBy: null, order: null });
        break;
    }
  }
}
