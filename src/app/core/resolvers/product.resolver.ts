import { ResolveFn, Router } from '@angular/router';
import { ProductModel } from '@core/models/product.model';
import { inject } from '@angular/core';
import { ProductService } from '@shared/services/product.service';
import { catchError, delay, EMPTY } from 'rxjs';
import { environment } from '../../../environments/environment';

export const productResolver: ResolveFn<ProductModel> = (route) => {
  const productService = inject(ProductService);
  const router = inject(Router);
  const id = Number(route.paramMap.get('id'));

  if (!id || Number.isNaN(id)) {
    router.navigate(['/not-found'], {
      skipLocationChange: true,
      state: { returnUrl: '/products' },
    });
    return EMPTY;
  }

  return productService.getById(id).pipe(
    delay(environment.loaderDelayMs), // 👈 artificial delay for testing loader
    catchError(() => {
      router.navigate(['/not-found'], {
        skipLocationChange: true,
        state: { returnUrl: '/products' },
      });
      return EMPTY;
    }),
  );
};
