import { Component, inject, input, output } from '@angular/core';
import { ProductModel } from '@core/models/product.model';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-actions',
  imports: [],
  templateUrl: './actions.html',
  styleUrl: './actions.css',
})
export class Actions {
  product = input.required<ProductModel>();
  private toast = inject(ToastService);
  addToCart = output<ProductModel>();
  addToWishlist = output<ProductModel>();

  onAddToCart() {
    this.addToCart.emit(this.product());
    this.toast.success('Added to cart');
  }

  onAddToWishlist() {
    this.addToWishlist.emit(this.product());
    this.toast.info('Added to Wishlist');
  }
}
