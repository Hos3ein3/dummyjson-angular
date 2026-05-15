import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { ProductService } from '@shared/services/product.service';
import { PagedResult } from '@shared/models/base.model';
import { ProductModel } from '@core/models/product.model';
import { Filtering } from './components/filtering/filtering';
import { ProductItem } from './components/product-item/product-item';
import { environment } from '../../../../../environments/environment';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductGlassLoader } from '../../components/product-glass-loader/product-glass-loader';
import { ProductCategoryService } from '@shared/services/product-category.service';
import { ProductCategoryModel } from '@core/models/product-caterogy.model';

@Component({
  selector: 'app-products',
  imports: [Filtering, ProductItem, DecimalPipe, ProductGlassLoader],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit, AfterViewInit {
  products = signal<PagedResult<ProductModel> | undefined>(undefined);
  productCategories = signal<ProductCategoryModel[] | undefined>(undefined);
  private productService = inject(ProductService);
  private productCategoryService = inject(ProductCategoryService);
  private onDestroyRef = inject(DestroyRef);
  protected skip: number = 0;
  protected limit: number = 16;
  hasMore = signal(true);
  isFetching = signal(false);
  searchTerm = signal('');
  sortBy = signal<string | null>(null);
  sortOrder = signal<'asc' | 'desc' | null>(null);
  selectedCategory = signal<string | undefined>(undefined);

  private observer?: IntersectionObserver;
  sentinel = viewChild<ElementRef>('sentinel');

  ngOnInit() {
    const subProductCategory = this.productCategoryService.getAllList({}).subscribe({
      next: (result) => {
        setTimeout(() => {
          this.productCategories.set(result);
        }, environment.loaderDelayMs);
      },
    });
    this.onDestroyRef.onDestroy(() => subProductCategory.unsubscribe());

    this.loadProducts();
  }
  ngAfterViewInit() {
    const el = this.sentinel()?.nativeElement;
    if (!el) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !this.isFetching() && this.hasMore()) {
          this.loadProducts();
        }
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '200px',
      },
    );

    this.observer.observe(el);

    this.onDestroyRef.onDestroy(() => {
      this.observer?.disconnect();
    });
  }

  onCategoryChanged(category?: string): void {
    if (this.selectedCategory() === category) return;
    this.limit=0;
    this.selectedCategory.set(category);
    this.resetAndReload();
  }

  onSearchChanged(value: string): void {
    this.searchTerm.set(value);
    this.limit =16;
    this.resetAndReload();
  }

  onSortChanged(sort: { sortBy: string | null; order: 'asc' | 'desc' | null }): void {
    this.sortBy.set(sort.sortBy);
    this.sortOrder.set(sort.order);
    this.limit = 16;
    this.resetAndReload();
  }

  private resetAndReload(): void {
    this.products.set(undefined);
    this.skip = 0;
    this.limit = 16;
    this.hasMore.set(true);
    this.loadProducts(true);
  }
  protected readonly Math = Math;

  private loadProducts(reset = false): void {
    if (this.isFetching()) return;
    if (!reset && !this.hasMore()) return;

    this.isFetching.set(true);

    const currentSkip = reset ? 0 : this.skip;
console.log('limit in load:' + this.limit);
    this.productService
      .getAll({
        skip: currentSkip,
        limit: this.limit,
        sortBy: this.sortBy() ?? undefined,
        order: this.sortOrder() ?? undefined,
        q: this.searchTerm() || undefined,
        category: this.selectedCategory() ?? undefined,
      })
      .pipe(takeUntilDestroyed(this.onDestroyRef))
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.products.update((current) => ({
              items: reset ? result.items : [...(current?.items ?? []), ...result.items],
              total: result.total,
              skip: result.skip,
              limit: result.limit,
            }));

            this.skip = currentSkip + result.items.length;
            this.hasMore.set((this.products()?.items.length ?? 0) < result.total);
            this.isFetching.set(false);
          }, environment.loaderDelayMs);
        },
        error: () => {
          this.isFetching.set(false);
        },
      });
  }

}
