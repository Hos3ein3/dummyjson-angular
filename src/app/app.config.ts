import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes)],
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
