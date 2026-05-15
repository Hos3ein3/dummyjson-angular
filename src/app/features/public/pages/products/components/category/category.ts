import { Component, input, output } from '@angular/core';
import { ProductCategoryModel } from '@core/models/product-caterogy.model';

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {

  categories = input<ProductCategoryModel[] | undefined>(undefined);
  selectedCategory = input<string | undefined>(undefined);

  categoryChanged = output<string | undefined>();

  onCategoryClick(category?: string): void {

    this.categoryChanged.emit(category);
  }

  skeletonItems = Array.from({ length: 25 });
}
