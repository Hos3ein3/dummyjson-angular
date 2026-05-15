import { Component, computed, Input } from '@angular/core';
import { ProductModel } from '@core/models/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-price',
  imports: [CurrencyPipe],
  templateUrl: './price.html',
  styleUrl: './price.css',
})
export class Price {
  @Input({ required: true }) product!: ProductModel;
  hasDiscount = computed(() => this.product.discountPercentage > 5);

  originalPrice = computed(() => this.product.price / (1 - this.product.discountPercentage / 100));
}
