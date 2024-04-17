import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { CommentService } from '../../comment/comment.service';
import { Comment } from '../../comment/comment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../users/user.service';
import { User } from '../../users/users';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  comments: Comment[] = [];
  users: User[] = [];

  showComments: boolean[] = [];
  addForm!: FormGroup;
  searchForm!: FormGroup;
  showForm: boolean = false;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers(10).pipe(
      switchMap((user) => {
        this.users = user;
        const userPostRequests = this.users.map((user) =>
          this.postService.getUserPost(user.id)
        )
        return forkJoin(userPostRequests)
      }),
      switchMap((usersPost: Post[][]) => {
        this.posts = usersPost.flatMap((posts: any) => posts);

        const commentPostRequest = this.posts.map((post) =>
          this.commentService.getComment(post.id)
        )
        return forkJoin(commentPostRequest)
      })).subscribe((comments: Comment[][]) => {
        this.comments = comments.flatMap((comments) => comments);
      }
    );

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

  checkIfHasComment(post_id: number): boolean {
    let hasComment = this.comments.some(
      (comment) => comment.post_id == post_id
    );
    return hasComment ? true : false;
  }

  toggleComments(index: number) {
    this.showComments[index] = !this.showComments[index];
  }

  showAddForm() {
    this.showForm = !this.showForm;
  }

  createPost(post: Post) {
    try {
      this.postService.addPost(post).subscribe(() => {
        const userPostRequests = this.users.map((user) =>
          this.postService.getUserPost(user.id)
        );

        forkJoin(userPostRequests).subscribe((posts: Post[][]) => {
          this.posts = posts.flatMap((posts) => posts);
          this.addForm.reset();
          this.showAddForm();
        });
      });
    } catch (error) {
      alert(error);
    }
  }

  searchPost(value: string) {
    this.postService.searchPost(value).subscribe(() => {
      const userPostRequests = this.users.map((user) =>
        this.postService.getUserPost(user.id)
      );
      forkJoin(userPostRequests).subscribe((posts: Post[][]) => {
        this.posts = posts.flatMap((posts) => posts);
        this.posts = this.posts.filter((post) => {
          return post.title.toLowerCase().includes(value.toLowerCase());
        });
      });
    });
  }

  deletePost(post: Post) {
    if (confirm('Are you sure to delete the post?')) {
      this.postService.deleteUserPost(post).subscribe(() => {
        const userPostRequests = this.users.map((user) =>
          this.postService.getUserPost(user.id)
        );
        forkJoin(userPostRequests).subscribe((posts: Post[][]) => {
          this.posts = posts.flatMap((posts) => posts);
        });
      });
    }
  }
}
