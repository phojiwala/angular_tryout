import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { PostService } from './app/posts/post.service';
import { UserService } from './app/users/user.service';
import { routerConfig } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routerConfig),
    provideHttpClient(),
    PostService,
    UserService
  ]
}).catch((err) => console.error(err));