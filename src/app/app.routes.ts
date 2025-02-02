import { Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { ChatComponent } from './chat/chat.component';

interface RouteConfig {
  path: string;
  component: any;
  label: string;
}

const routes: RouteConfig[] = [
  { 
    path: 'posts',
    component: PostsComponent,
    label: 'Posts'
  },
  { 
    path: 'users',
    component: UsersComponent,
    label: 'Users'
  },
  { 
    path: 'chat',
    component: ChatComponent,
    label: 'Chat'
  }
];

// For Angular Router
export const routerConfig: Routes = [
  ...routes,
  { path: '', redirectTo: '/posts', pathMatch: 'full' }
];

// For Navigation
export const navigationLinks = routes.map(route => ({
  link: `/${route.path}`,
  label: route.label
}));
