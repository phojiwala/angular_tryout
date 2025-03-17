import { Route } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { RoleGuard } from './guards/role.guard';
import { LoginComponent } from './login/login.component';
import { PostsComponent } from './posts/posts.component';
import { SearchComponent } from './search/search.component';
import { StoreComponent } from './store/store.component';
import { TodosComponent } from './todos/todos.component';
import { UsersComponent } from './users/users.component';

interface CustomRoute extends Route {
  label?: string;
}

const routes: CustomRoute[] = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RoleGuard]
  },
  {
    path: 'posts',
    component: PostsComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin'] },
    label: 'Posts'
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin'] },
    label: 'Users'
  },
  {
    path: 'todos',
    component: TodosComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin'] },
    label: 'Todos'
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin'] },
    label: 'Chat'
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin'] },
    label: 'Search'
  },
  {
    path: 'store',
    component: StoreComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin'] },
    label: 'Store'
  },
  {
    path: 'form-builder',
    component: FormBuilderComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin'] },
    label: 'Form Builder'
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

export const routerConfig = routes;

// For Navigation
export const navigationLinks = (routes as CustomRoute[])
  .filter(route => route.label)
  .map(route => ({
    link: `/${route.path}`,
    label: route.label
  }));
