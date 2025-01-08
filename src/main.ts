import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Post } from './app/post.interface';
import { User } from './app/user.interface';
import { PostService } from './app/post.service';
import { UserService } from './app/user.service';
import {
  HlmCaptionComponent,
  HlmTableComponent,
  HlmTdComponent,
  HlmThComponent,
  HlmTrowComponent,
} from '@spartan-ng/ui-table-helm';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HlmTableComponent,
    HlmTrowComponent,
    HlmThComponent,
    HlmTdComponent,
    HlmCaptionComponent
  ],
  templateUrl: 'app/app.component.html',
})
export class App implements OnInit {
  posts: Post[] = [];
  users: User[] = [];
  selectedPost: Post | null = null;
  activeTab: 'posts' | 'users' = 'posts';
  displayedPosts: Post[] = [];
  postsPerPage = 10;
  currentPage = 1;

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadMorePosts() {
    const startIndex = this.currentPage * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    const newPosts = this.posts.slice(startIndex, endIndex);
    this.displayedPosts = [...this.displayedPosts, ...newPosts];
    this.currentPage++;
  }

  loadPosts() {
    this.postService.getPosts().subscribe(
      (data) => {
        this.posts = data;
        this.displayedPosts = this.posts.slice(0, this.postsPerPage);
      }
    );
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      }
    );
  }

  showPost(id: number) {
    this.postService.getPost(id).subscribe(
      (data) => {
        this.selectedPost = data;
      }
    );
  }

  back() {
    this.selectedPost = null;
  }

  showPosts() {
    this.activeTab = 'posts';
    if (this.posts.length === 0) {
      this.loadPosts();
    }
  }

  showUsers() {
    this.activeTab = 'users';
    if (this.users.length === 0) {
      this.loadUsers();
    }
  }
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient()
  ]
});