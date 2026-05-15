import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const errorPageGuard: CanActivateFn=()=>{
  const router = inject(Router);

  // navigation id 1 means the user typed it directly in the URL bar
  if (router.getCurrentNavigation()?.id === 1) {
    router.navigate(['/']);
    return false;
  }

  return true;
}
