import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { PostsComponent } from './app/posts/posts.component';
import { UsersComponent } from './app/users/users.component';
import { PostService } from './app/posts/post.service';
import { UserService } from './app/users/user.service';

const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'users', component: UsersComponent },
  { path: '', redirectTo: '/posts', pathMatch: 'full' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    PostService,
    UserService
  ]
}).catch(err => console.error(err));