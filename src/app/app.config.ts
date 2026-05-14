import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes),provideHttpClient()],
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
