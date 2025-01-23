import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from './post.interface';
import { User } from './user.interface';
import { PostService } from './post.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
    this.loadUsers();
  }

  loadPosts() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
      this.displayedPosts = this.posts.slice(0, this.postsPerPage);
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  showPost(id: number) {
    const post = this.posts.find(p => p.id === id);
    if (post) {
      this.selectedPost = post;
    }
  }

  back() {
    this.selectedPost = null;
  }

  showPosts() {
    this.activeTab = 'posts';
    this.selectedPost = null;
  }

  showUsers() {
    this.activeTab = 'users';
    this.selectedPost = null;
  }

  loadMorePosts() {
    this.currentPage++;
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    this.displayedPosts = this.posts.slice(0, endIndex);
  }
}
