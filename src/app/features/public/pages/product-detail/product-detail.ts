import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProductContent } from './components/product-content/product-content';
import { ProductModel } from '@core/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { Reviews } from './components/reviews/reviews';
import { BreadcrumbItem } from '@shared/models/breadcrumb.model';
import { Breadcrumb } from '../../components/breadcrumb/breadcrumb';
import { UrlBuilder } from '@shared/utils/url-builder';

@Component({
  selector: 'app-product-detail',
  imports: [Breadcrumb, ProductContent, Reviews],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  product = signal<ProductModel | undefined>(undefined);


  breadcrumbItems = computed<BreadcrumbItem[]>(() => [
    {
      link: UrlBuilder.route('products'),
      label: 'Products',
    },
    {
      link: UrlBuilder.route(this.product()?.title),
      label: this.product()!.title,
    },
  ]);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    // Data is already fetched — no HTTP call needed here
    const resolved = this.route.snapshot.data['product'] as ProductModel;
    this.product.set(resolved);
  }

}
