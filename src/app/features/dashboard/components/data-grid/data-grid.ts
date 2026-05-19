import { Component, computed, input, output } from '@angular/core';
import { PagedResult } from '@shared/models/base.model';

@Component({
  selector: 'app-data-grid',
  imports: [],
  templateUrl: './data-grid.html',
  styleUrl: './data-grid.css',
})
export class DataGrid<T extends Record<string, any>> {
  data = input.required<PagedResult<T>>();
  options = input.required<DataGridOptions<T>>();
  loading = input(false);

  pageChange = output<number>();
  sortChange = output<{ key: string; direction: 'asc' | 'desc' }>();

  rows = computed(() => this.data().items);

  currentPage = computed(() => {
    const { skip, limit } = this.data();
    if (!limit) return 1;
    return Math.floor(skip / limit) + 1;
  });

  totalPages = computed(() => {
    const { total, limit } = this.data();
    if (!limit) return 1;
    return Math.max(1, Math.ceil(total / limit));
  });

  toggleSort(col: { key: string | keyof T; sortable?: boolean }) {
    if (col.sortable === false) return;

    const key = String(col.key);
    const currentKey = this.options().defaultSort ? String(this.options().defaultSort) : null;

    const currentDirection = this.options().defaultSortDirection ?? 'asc';

    const direction = currentKey !== key ? 'asc' : currentDirection === 'asc' ? 'desc' : 'asc';

    this.sortChange.emit({ key, direction });
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }

  read(row: T, key: string | keyof T) {
    return row[key as keyof T];
  }

  rowTrack(index: number, row: T) {
    return this.options().trackBy?.(index, row) ?? index;
  }
}

export interface DataGridColumn<T = any> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  className?: string;
  headerClassName?: string;
  render?: (value: any, row: T, index: number) => string;
}

export interface DataGridOptions<T = any> {
  columns: DataGridColumn<T>[];
  defaultSort?: keyof T | string;
  defaultSortDirection?: 'asc' | 'desc';
  emptyText?: string;
  trackBy?: (index: number, row: T) => any;
}

