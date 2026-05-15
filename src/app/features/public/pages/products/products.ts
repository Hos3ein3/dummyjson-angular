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
import { SearchIcon } from '@shared/components/icons';
import { Filtering } from './components/filtering/filtering';
import { RouterLink } from '@angular/router';
import { StarRating } from '@shared/components/star-rating/star-rating';
import { ProductItem } from './components/product-item/product-item';
import { environment } from '../../../../../environments/environment';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { DiscountBadge } from './components/discount-badge/discount-badge';
import { StockBadge } from './components/stock-badge/stock-badge';
import { TotalItem } from './components/total-item/total-item';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductGlassLoader } from '../../components/product-glass-loader/product-glass-loader';

@Component({
  selector: 'app-products',
  imports: [Filtering, ProductItem, DecimalPipe, ProductGlassLoader],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit, AfterViewInit {
  products = signal<PagedResult<ProductModel> | undefined>(undefined);
  private productService = inject(ProductService);
  private onDestroyRef = inject(DestroyRef);
  protected skip: number = 0;
  protected limit: number = 16;
  hasMore = signal(true);
  isFetching = signal(false);

  private observer?: IntersectionObserver;
  sentinel = viewChild<ElementRef>('sentinel');

  ngOnInit() {
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

  protected readonly Math = Math;

  private loadProducts() {
    console.log('skip:' + this.skip);
    console.log('limit:' + this.limit);
    if (this.isFetching() || !this.hasMore()) return;
    this.isFetching.set(true);

    const subscription = this.productService
      .getAll({ skip: this.skip, limit: this.limit })
      .pipe(takeUntilDestroyed(this.onDestroyRef))
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.products.update((current) => ({
              items: [...(current?.items ?? []), ...result.items],
              total: result.total,
              skip: result.skip,
              limit: result.limit,
            }));

            this.skip += this.limit;
            this.hasMore.set((this.products()?.items.length ?? 0) < result.total);
            this.isFetching.set(false);
          }, environment.loaderDelayMs);
        },
        error: () => {
          this.isFetching.set(false);
        },
      });
    this.onDestroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
