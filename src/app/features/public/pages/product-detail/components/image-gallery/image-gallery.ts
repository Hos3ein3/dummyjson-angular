import { Component, computed, Input, signal } from '@angular/core';
import { ProductModel } from '@core/models/product.model';

@Component({
  selector: 'app-image-gallery',
  imports: [],
  templateUrl: './image-gallery.html',
  styleUrl: './image-gallery.css',
})
export class ImageGallery {
  @Input({ required: true }) product!: ProductModel;
  allImages = computed(() =>
    (this.product.images ?? []).filter((v, i, arr) => arr.indexOf(v) === i),
  );

  activeImage = signal<string>('');

  activeImageSrc = computed(() => this.activeImage() || this.allImages()[0] || '');

  setActive(img: string) {
    this.activeImage.set(img);
  }
}
