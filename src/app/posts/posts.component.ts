import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from './post.service';
import { Post } from './post.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe(
      (posts) => {
        this.posts = posts;
      }
    );
  }
}
