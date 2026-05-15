import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { ProductModel } from '@core/models/product.model';
import { UrlBuilder } from '@shared/utils/url-builder';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { ApiPagedResponse, PagedResult, QueryParams } from '@shared/models/base.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseApiService<ProductModel> {
  protected override baseUrl: string = UrlBuilder.combine(
    environment.BaseUrl,
    environment.ProductUrl,
  );
  protected override itemsKey: string = 'products';

  override getAll(query?: QueryParams): Observable<PagedResult<ProductModel>> {
    let url = this.baseUrl;

    if (query?.q) {
      url = UrlBuilder.combine(this.baseUrl, 'search');
    } else if (query?.category) {
      url = UrlBuilder.combine(this.baseUrl, 'category', query.category);
    }


    const params = this.buildParams({
      skip: query?.skip,
      limit: query?.limit,
      sortBy: query?.sortBy,
      order: query?.order,
      q: query?.q,
    });
    console.log(url);

    console.log('full url:', `${url}?${params.toString()}`);

    return this.http.get<Record<string, any>>(url, { params }).pipe(
      map((response) => ({
        items: response[this.itemsKey] ?? [],
        total: response['total'] ?? 0,
        skip: response['skip'] ?? 0,
        limit: response['limit'] ?? 0,
      })),
    );
  }
}
