import { Component, Input } from '@angular/core';
import { ProductModel } from '@core/models/product.model';

@Component({
  selector: 'app-discount-badge',
  imports: [],
  templateUrl: './discount-badge.html',
  styleUrl: './discount-badge.css',
})
export class DiscountBadge {
  @Input({required:true}) item!: ProductModel;
    protected readonly Math = Math;
}
