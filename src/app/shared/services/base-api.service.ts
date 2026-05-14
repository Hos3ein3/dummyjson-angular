// shared/services/base-api.service.ts
import { DestroyRef, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, Subscription } from 'rxjs';
import { UrlBuilder } from '@shared/utils/url-builder';
import { PagedResult, QueryParams } from '@shared/models/base.model';


type ApiPagedResponse<T, K extends string> = {
  [P in K]: T[];
} & {
  total: number;
  skip: number;
  limit: number;
};

export abstract class BaseApiService<T, TCreate = Partial<T>, TUpdate = Partial<T>> {
  protected http = inject(HttpClient);
  protected destroyRef = inject(DestroyRef);

  protected abstract baseUrl: string;
  protected abstract itemsKey: string;

  getAll(query: QueryParams): Observable<PagedResult<T>> {
    const params = this.buildParams(query);

    return this.http.get<ApiPagedResponse<T, typeof this.itemsKey>>(this.baseUrl, { params }).pipe(
      map((response) => ({
        items: response[this.itemsKey] ?? [],
        total: response.total,
        skip: response.skip,
        limit: response.limit,
      })),
    );
  }

  // getAll(query?: QueryParams): Observable<PagedResult<T>> {
  //   const params = this.buildParams(query);
  //   return this.http.get<PagedResult<T>>(this.baseUrl, { params });
  // }

  getById(id: string | number): Observable<T> {
    return this.http.get<T>(UrlBuilder.combine(this.baseUrl, id));
  }

  create(payload: TCreate): Observable<T> {
    return this.http.post<T>(this.baseUrl, payload);
  }

  update(id: string | number, payload: TUpdate): Observable<T> {
    return this.http.put<T>(UrlBuilder.combine(this.baseUrl, id), payload);
  }

  patch(id: string | number, payload: Partial<TUpdate>): Observable<T> {
    return this.http.patch<T>(UrlBuilder.combine(this.baseUrl, id), payload);
  }

  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(UrlBuilder.combine(this.baseUrl, id));
  }
  onDestroy(subscription: Subscription) {
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  // ── Helper ───────────────────────────────────────────
  private buildParams(query?: QueryParams): HttpParams {
    let params = new HttpParams();
    if (!query) return params;
    Object.entries(query).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params = params.set(key, String(value));
      }
    });
    return params;
  }
}
