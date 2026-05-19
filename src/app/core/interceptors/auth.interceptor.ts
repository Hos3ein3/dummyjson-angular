// core/auth/interceptors/auth.interceptor.ts
import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const authService = inject(AuthService);

  let authReq = req.clone({ withCredentials: true });

  const token = authService.accessToken();
  if (token && shouldAttachToken(req.url)) {
    authReq = authReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !req.url.includes('/auth/login') &&
        !req.url.includes('/auth/refresh')
      ) {
        return handle401Error(authReq, next, authService);
      }

      return throwError(() => error);
    }),
  );
};

function handle401Error(req: HttpRequest<unknown>, next: HttpHandlerFn, authService: AuthService) {
  if (!authService.getIsRefreshing()) {
    authService.setIsRefreshing(true);
    authService.refreshTokenSubject.next(null);

    return authService.refreshSession().pipe(
      switchMap((res) => {
        authService.setIsRefreshing(false);
        authService.refreshTokenSubject.next(res.accessToken);

        const retryReq = req.clone({
          withCredentials: true,
          setHeaders: {
            Authorization: `Bearer ${res.accessToken}`,
          },
        });

        return next(retryReq);
      }),
      catchError((err) => {
        authService.setIsRefreshing(false);
        authService.clearSession();
        return throwError(() => err);
      }),
    );
  }

  return authService.refreshTokenSubject.pipe(
    filter((token) => token !== null),
    take(1),
    switchMap((token) => {
      const retryReq = req.clone({
        withCredentials: true,
        setHeaders: {
          Authorization: `Bearer ${token!}`,
        },
      });

      return next(retryReq);
    }),
  );
}

function shouldAttachToken(url: string): boolean {
  return url.includes('dummyjson.com/auth');
}
