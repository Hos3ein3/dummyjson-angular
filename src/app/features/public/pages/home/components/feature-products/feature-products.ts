import { Component,input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductModel } from '@core/models/product.model';
import { CurrencyPipe } from '@angular/common';
import { ArrowDirection, ArrowIcon } from '@shared/components/icons';
import { StarRating } from '@shared/components/star-rating/star-rating';
import { PagedResult } from '@shared/models/base.model';
import { ProductGlassLoader } from '../../../../components/product-glass-loader/product-glass-loader';


@Component({
  selector: 'app-feature-products',
  imports: [RouterLink, CurrencyPipe, ArrowIcon, StarRating, ProductGlassLoader],
  templateUrl: './feature-products.html',
  styleUrl: './feature-products.css',
})
export class FeatureProducts {
  products = input.required<PagedResult<ProductModel> | undefined>();

  protected readonly Math = Math;
  protected readonly ArrowIcon = ArrowIcon;
  protected readonly ArrowDirection = ArrowDirection;
}
