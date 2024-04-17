import { Component, OnInit } from '@angular/core';
import { User } from '../users';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../post/post.service';
import { Post } from '../../post/post';
import { CommentService } from '../../comment/comment.service';
import { Comment } from '../../comment/comment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent implements OnInit {
  user: User = {
    id: 0,
    name: '',
    email: '',
    gender: '',
    status: '',
  };
  posts: Post[] = [];
  comments: Comment[] = [];
  postUploaded: boolean = false;
  showComments: boolean[] = [];
  addCommentForm!: FormGroup;
  showForm: boolean = false;
  hasComment: any

  constructor(
    private userService: UserService,
    private postService: PostService,
    private commentService: CommentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          let idUser = +params['id'];
          return this.userService.getUserDetail(idUser);
        }),
        switchMap((user) => {
          this.user = user;
          return this.postService.getUserPost(user.id);
        })
      )
      .subscribe((posts) => {
        this.posts = posts;
        this.postUploaded = true;
        this.posts.forEach((post) => {
          this.commentService.getComment(post.id).subscribe((comments) => {
            let array = comments;
            this.comments = this.comments.concat(array);
          });
        });
      });

    this.addCommentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    });
  }

  toggleComments(index: number) {
    this.showComments[index] = !this.showComments[index];
  }

  btnDisabled(post_id: number): boolean {
     this.hasComment = this.comments.find(
      (comment) => comment.post_id == post_id
    );
    return this.hasComment ? true : false;
  }

  showAddForm() {
    this.showForm = !this.showForm;
  }

  createComment(comment: Comment, post_id: number) {
    this.commentService.createPostComment(post_id, comment).subscribe(() => {
      this.addCommentForm.reset();
      this.showAddForm();

      this.comments = [];

      this.posts.forEach((post) => {
        this.commentService.getComment(post.id).subscribe((comments) => {
          let array = comments;
          this.comments = this.comments.concat(array);
        });
      });
    });
  }
}
