import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-glass-loader',
  imports: [],
  templateUrl: './product-glass-loader.html',
  styleUrl: './product-glass-loader.css',
})
export class ProductGlassLoader {
  @Input() count: number = 8;
  protected readonly skeletonItems = Array.from({ length: this.count }, (_, i) => i);
}
