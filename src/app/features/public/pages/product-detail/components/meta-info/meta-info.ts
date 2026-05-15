import { Component, Input } from '@angular/core';
import { ProductModel } from '@core/models/product.model';

@Component({
  selector: 'app-meta-info',
  imports: [],
  templateUrl: './meta-info.html',
  styleUrl: './meta-info.css',
})
export class MetaInfo {
  @Input({ required: true }) product!: ProductModel;
}
