import { Injectable } from '@angular/core';
import { BaseApiService } from '@shared/services/base-api.service';
import { RecipeModel } from '@core/models/recipe.model';
import { UrlBuilder } from '@shared/utils/url-builder';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipeService extends BaseApiService<RecipeModel> {
  protected override baseUrl: string=UrlBuilder.combine(environment.BaseUrl,environment.RecipeUrl);
  protected override itemsKey: string="recipes";
}
