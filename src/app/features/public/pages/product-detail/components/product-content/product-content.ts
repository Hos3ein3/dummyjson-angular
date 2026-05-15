import { Component, Input } from '@angular/core';
import { ImageGallery } from '../image-gallery/image-gallery';
import { ProductInfo } from '../product-info/product-info';
import { ProductModel } from '@core/models/product.model';

@Component({
  selector: 'app-product-content',
  imports: [ImageGallery, ProductInfo],
  templateUrl: './product-content.html',
  styleUrl: './product-content.css',
})
export class ProductContent {
  @Input({ required: true }) product!: ProductModel;
}
