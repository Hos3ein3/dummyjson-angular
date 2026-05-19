// core/auth/services/auth.service.ts
import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, switchMap, map, catchError, throwError, of } from 'rxjs';
import { BaseApiService } from '@shared/services/base-api.service';
import { UrlBuilder } from '@shared/utils/url-builder';
import { environment } from '../../../environments/environment';
import { AuthUserModel } from '@core/models/authUser.model';
import { LoginRequest } from '@core/dto/LoginRequest';
import { RefreshResponse } from '@core/dto/RefreshTokenResponse';
// import { AuthUser, LoginRequest, RefreshResponse } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseApiService<AuthUserModel> {
  protected override baseUrl: string = UrlBuilder.combine(environment.BaseUrl, environment.AuthUrl);
  protected override itemsKey: string = '...';
  private readonly loginUrl = UrlBuilder.combine(environment.BaseUrl, environment.LoginUrl);
  private readonly refreshTokenUrl = UrlBuilder.combine(
    environment.BaseUrl,
    environment.RefreshTokenUrl,
  );
  private readonly getCurrentUserUrl = UrlBuilder.combine(
    environment.BaseUrl,
    environment.CurrentUserUrl,
  );

  private readonly _accessToken = signal<string | null>(null);
  private readonly _refreshToken = signal<string | null>(null);
  private readonly _currentUser = signal<AuthUserModel | null>(null);

  readonly accessToken = computed(() => this._accessToken());
  readonly refreshToken = computed(() => this._refreshToken());
  readonly currentUser = computed(() => this._currentUser());
  readonly isAuthenticated = computed(() => !!this._accessToken());

  readonly refreshTokenSubject = new BehaviorSubject<string | null>(null);
  private isRefreshing = false;

  login(username: string, password: string, expiresInMins = 30): Observable<AuthUserModel> {
    const body: LoginRequest = { username, password, expiresInMins };

    return this.http
      .post<AuthUserModel>(this.loginUrl, body, {
        withCredentials: true,
      })
      .pipe(
        tap((res) => {
          this.setSession(res);
        }),
      );
  }
  private setSession(user: AuthUserModel): void {
    this._accessToken.set(user.accessToken);
    this._refreshToken.set(user.refreshToken);
    this._currentUser.set(user);
    sessionStorage.setItem('auth_user', JSON.stringify(user));
  }

  getMe(): Observable<AuthUserModel> {
    return this.http
      .get<AuthUserModel>(this.getCurrentUserUrl, {
        withCredentials: true,
      })
      .pipe(
        tap((user) => {
          const current = this._currentUser();
          this._currentUser.set({
            ...user,
            accessToken: current?.accessToken ?? this._accessToken() ?? '',
            refreshToken: current?.refreshToken ?? this._refreshToken() ?? '',
          });
        }),
      );
  }

  refreshSession(expiresInMins = 30): Observable<RefreshResponse> {
    const refreshToken = this._refreshToken();

    return this.http
      .post<RefreshResponse>(
        this.refreshTokenUrl,
        {
          refreshToken,
          expiresInMins,
        },
        { withCredentials: true },
      )
      .pipe(
        tap((res) => {
          this._accessToken.set(res.accessToken);
          this._refreshToken.set(res.refreshToken);
        }),
      );
  }

  tryRestoreSession() {
    const refreshToken = this.refreshToken();

    if (!refreshToken) {
      return of(null);
    }

    return this.refreshSession().pipe(
      switchMap(() => this.getMe()),
      catchError(() => {
        this.clearSession();
        return of(null);
      }),
    );
  }

  logout(): void {
    this.clearSession();
  }

  clearSession(): void {
    this._accessToken.set(null);
    this._refreshToken.set(null);
    this._currentUser.set(null);
    this.refreshTokenSubject.next(null);
    this.isRefreshing = false;
    sessionStorage.removeItem('auth_user');
  }
  restoreFromStorage(): void {
    const raw = sessionStorage.getItem('auth_user');
    if (!raw) return;

    try {
      const user = JSON.parse(raw) as AuthUserModel;

      if (!user?.accessToken) {
        this.clearSession();
        return;
      }

      this._accessToken.set(user.accessToken);
      this._refreshToken.set(user.refreshToken ?? null);
      this._currentUser.set(user);
    } catch {
      this.clearSession();
    }
  }

  getIsRefreshing(): boolean {
    return this.isRefreshing;
  }

  setIsRefreshing(value: boolean): void {
    this.isRefreshing = value;
  }
  hasUser(): boolean {
    return !!this.currentUser();
  }

  userName(): string {
    return this.currentUser()?.firstName ?? '';
  }
  // hasRole(role: string): boolean {
  //   return this.currentUser()?.roles?.includes(role) ?? false;
  // }
}
