import { Injectable } from '@angular/core';
import { BaseApiService } from '@shared/services/base-api.service';
import { QuoteModel } from '@core/models/quote.model';
import { UrlBuilder } from '@shared/utils/url-builder';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuoteService extends BaseApiService<QuoteModel> {
  protected override baseUrl: string = UrlBuilder.combine(
    environment.BaseUrl,
    environment.QuoteUrl,
  );
  protected override itemsKey: string = 'quotes';
}
