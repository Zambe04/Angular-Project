import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { CommentService } from '../../comment/comment.service';
import { Comment } from '../../comment/comment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  comments: Comment[] = [];
  showComments: boolean[] = [];
  addForm!: FormGroup;
  searchForm!: FormGroup;
  showForm: boolean = false;

  constructor(
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.postService.getPost().subscribe((post) => (this.posts = post));
    this.commentService
      .getComment()
      .subscribe((comment) => (this.comments = comment));

    this.addForm = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
      user_id: new FormControl('', Validators.required),
    });

    this.searchForm = new FormGroup({
      searchValue: new FormControl(''),
    });
  }

  toggleComments(index: number) {
    this.showComments[index] = !this.showComments[index];
  }

  showAddForm() {
    this.showForm = !this.showForm;
    console.log(this.posts)
  }

  createPost(post: Post) {
    try{
      this.postService.addPost(post).subscribe(() => {
        this.postService.getPost().subscribe((post) => {
          this.posts = post
          this.addForm.reset()
          this.showAddForm();
        })
      })
    }catch(error){
      alert(error)
    }
  }

  searchPost(){
    this.postService.searchPost(this.searchForm.value.searchValue).subscribe((data) => {
      this.posts = data
    })
  }

  deletePost(post: Post){
    if(confirm("Are you sure to delete the post?")) {
      this.postService.deleteUserPost(post.id).subscribe(() => {
        this.postService.getPost().subscribe((post) => this.posts = post)
      })
    }
  }
}
