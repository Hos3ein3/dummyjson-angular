import { Component, computed, Input } from '@angular/core';
import { Price } from '../price/price';
import { MetaInfo } from '../meta-info/meta-info';
import { Tags } from '../tags/tags';
import { Actions } from '../actions/actions';
import { ProductModel } from '@core/models/product.model';
import { StarRating } from '@shared/components/star-rating/star-rating';

@Component({
  selector: 'app-product-info',
  imports: [Price, MetaInfo, Tags, Actions, StarRating],
  templateUrl: './product-info.html',
  styleUrl: './product-info.css',
})
export class ProductInfo {
  @Input({ required: true }) product!: ProductModel;

  hasDiscount = computed(() => this.product.discountPercentage > 5);
  discountLabel = computed(() => `-${Math.round(this.product.discountPercentage)}%`);
}
