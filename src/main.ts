import { provideHttpClient } from '@angular/common/http'
import { bootstrapApplication } from '@angular/platform-browser'
import { provideRouter } from '@angular/router'
import { AppComponent } from './app/app.component'
import { routerConfig } from './app/app.routes'

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routerConfig), provideHttpClient()],
}).catch((err) => console.error(err))
