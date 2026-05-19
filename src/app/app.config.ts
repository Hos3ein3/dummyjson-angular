import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
    ),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};

// app.config.ts
// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(
//       routes,
//       withRouterConfig({ onSameUrlNavigation: 'reload' }),
//       withComponentInputBinding()    // route params as @Input() directly
//     ),
//   ]
// };
// export class BlogDetailComponent {
//   @Input() id!: string; // automatically bound from /blog/:id
// }
