import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { UserService } from '../../users/user.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit{
  posts: Post[] = [];

  constructor(private postService: PostService, private userService: UserService){}

  ngOnInit(): void {
    this.postService.getPost().subscribe(post => this.posts = post)
  }
}
