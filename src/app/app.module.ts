import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { PostService } from './posts/post.service';
import { UserService } from './users/user.service';

const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'users', component: UsersComponent },
  { path: '', redirectTo: '/posts', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [PostService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
