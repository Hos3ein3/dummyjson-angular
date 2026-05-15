import { Component, Input } from '@angular/core';
import { ProductModel } from '@core/models/product.model';
import { RouterLink } from '@angular/router';
import { StarRating } from '@shared/components/star-rating/star-rating';
import { DiscountBadge } from '../discount-badge/discount-badge';
import { StockBadge } from '../stock-badge/stock-badge';
import { CurrencyPipe } from '@angular/common';
import { UrlBuilder } from '@shared/utils/url-builder';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink, StarRating, DiscountBadge, StockBadge, CurrencyPipe],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
})
export class ProductItem {
  @Input({ required: true }) item!: ProductModel;
  protected readonly Math = Math;
  protected readonly UrlBuilder = UrlBuilder;
}
