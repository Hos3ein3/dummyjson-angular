import { Injectable } from '@angular/core';
import { BaseApiService } from '@shared/services/base-api.service';
import { PostModel } from '@core/models/post.model';
import { environment } from '../../../environments/environment';
import { UrlBuilder } from '@shared/utils/url-builder';

@Injectable({
  providedIn: 'root',
})
export class PostService extends BaseApiService<PostModel> {
  protected override baseUrl: string = UrlBuilder.combine(environment.BaseUrl,environment.PostUrl);
  protected override itemsKey: string="posts";
}
