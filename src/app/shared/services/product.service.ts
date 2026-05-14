import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { ProductModel } from '@core/models/product.model';
import { UrlBuilder } from '@shared/utils/url-builder';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseApiService<ProductModel> {
  protected override baseUrl: string=UrlBuilder.combine(environment.BaseUrl,environment.ProductUrl);
  protected override itemsKey: string="products";


}
