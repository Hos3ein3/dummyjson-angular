import { Injectable } from '@angular/core';
import { BaseApiService } from '@shared/services/base-api.service';
import { ProductCategoryModel } from '@core/models/product-caterogy.model';
import { UrlBuilder } from '@shared/utils/url-builder';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PagedResult } from '@shared/models/base.model';
import { ProductModel } from '@core/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService extends BaseApiService<ProductCategoryModel> {
  protected override baseUrl: string=UrlBuilder.combine(environment.BaseUrl,environment.ProductCategoryUrl);
  protected override itemsKey: string='categories';

getAllProductsByCategory(category:string)
{
  return  this.http.get<PagedResult<ProductModel>>(UrlBuilder.combine(this.baseUrl,'category', category));
}
}
