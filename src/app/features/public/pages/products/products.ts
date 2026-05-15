import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
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

@Component({
  selector: 'app-products',
  imports: [
    Filtering,
    ProductItem,

    DecimalPipe,
  ],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products = signal<PagedResult<ProductModel> | undefined>(undefined);
  private productService = inject(ProductService);
  private onDestroyRef = inject(DestroyRef);
  protected skip: number = 0;
  protected limit: number = 16;
  ngOnInit() {
    const subscription = this.productService
      .getAll({ skip: this.skip, limit: this.limit })
      .subscribe({
        next: (result) => {
          setTimeout(() => this.products.set(result), environment.loaderDelayMs);
        },
      });
    this.onDestroyRef.onDestroy(() => subscription.unsubscribe());
    this.skip += this.limit;
  }

  protected readonly Math = Math;
}
