import { Component, Input } from '@angular/core';
import { ProductModel } from '@core/models/product.model';

@Component({
  selector: 'app-tags',
  imports: [],
  templateUrl: './tags.html',
  styleUrl: './tags.css',
})
export class Tags {
  @Input({ required: true }) product!: ProductModel;
}
