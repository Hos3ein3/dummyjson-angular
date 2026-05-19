import { Component, inject, OnInit, signal } from '@angular/core';
import { BreadcrumbService } from '@shared/services/breadcrumb.service';
import { UrlBuilder } from '@shared/utils/url-builder';
import { DataGrid, DataGridOptions } from '../../components/data-grid/data-grid';
import { ProductService } from '@shared/services/product.service';
import { PagedResult } from '@shared/models/base.model';
import { ProductModel } from '@core/models/product.model';

@Component({
  selector: 'app-products',
  imports: [DataGrid],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  protected products = signal<PagedResult<ProductModel> | undefined>(undefined);
  private breadcrumb = inject(BreadcrumbService);
  private readonly productService = inject(ProductService);
  private skip = 0;
  private limit = 15;

  //products = signal<page[]>([]);
  loading = signal(true);

  gridOptions: DataGridOptions<any> = {
    // perPage: 8,
    defaultSort: 'title',
    columns: [
      { key: 'id', label: 'ID' },
      {
        key: 'thumbnail',
        label: 'Image',
        sortable: false,
        render: (v) =>
          `<img src="${v}" alt="" class="w-10 h-10 rounded-lg object-contain" style="background:var(--glass-bg)">`,
      },
      {
        key: 'title',
        label: 'Title',
        render: (v) => `<span class="font-medium" style="color:var(--color-text)">${v}</span>`,
      },
      {
        key: 'category',
        label: 'Category',
        render: (v) => `<span class="badge text-xs">${v}</span>`,
      },
      {
        key: 'price',
        label: 'Price',
        render: (v) => `$${Number(v).toFixed(2)}`,
      },
      {
        key: 'rating',
        label: 'Rating',
        render: (v) => `⭐ ${Number(v).toFixed(1)}`,
      },
      {
        key: 'stock',
        label: 'Stock',
        render: (v) =>
          `<span style="color:${v > 10 ? 'var(--success)' : 'var(--error)'}">${v}</span>`,
      },
    ],
  };



  ngOnInit() {
    this.breadcrumb.setItems([
      { label: 'Products', link: UrlBuilder.route('dashboard', 'products') },
    ]);


    try {
      const data = this.productService.getAll({ skip: this.skip, limit: this.limit }).subscribe({
        next: (result) => {
          console.log(result);
          //this.products.set(result);
        }
        ,
      });

    } finally {
      this.loading.set(false);
    }
  }
}

