import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { routerConfig } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routerConfig),
    provideClientHydration()
  ]
};

// Re-export for use in app.config.server.ts
export default appConfig;
