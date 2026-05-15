import { Component, output,input } from '@angular/core';
import {SearchIcon} from "@shared/components/icons";
import { Sorting } from '../sorting/sorting';
import { Category } from '../category/category';
import { ProductCategoryModel } from '@core/models/product-caterogy.model';

@Component({
  selector: 'app-filtering',
  imports: [SearchIcon, Sorting, Category],
  templateUrl: './filtering.html',
  styleUrl: './filtering.css',
})
export class Filtering {
  categories = input<ProductCategoryModel[] | undefined>(undefined);
  searchChanged = output<string>();
  sortChanged = output<{ sortBy: string | null; order: 'asc' | 'desc' | null }>();

  selectedCategory = input<string | undefined>(undefined);

  categoryChanged = output<string | undefined>();

  onCategoryChanged(category?: string): void {
    this.categoryChanged.emit(category);
  }

  onSearch(value: string) {
    this.searchChanged.emit(value);
  }

  onSortChanged(value: { sortBy: string | null; order: 'asc' | 'desc' | null }) {
    this.sortChanged.emit(value);
  }
}
