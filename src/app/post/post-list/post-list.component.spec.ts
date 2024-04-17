import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PostRoutingModule } from '../post-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostService } from '../post.service';
import { Post } from '../post';
import { User } from '../../users/users';
import { Comment } from '../../comment/comment';
import { UserService } from '../../users/user.service';
import { CommentService } from '../../comment/comment.service';
import { forkJoin, of } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

let mockModel: User[] = [
  {
    id: 6814118,
    name: 'John',
    email: 'john@gmail.com',
    gender: 'male',
    status: 'active',
  },
];

let mockModelPost: Post[] = [
  { id: 123456, user_id: 6814118, title: 'The Sun', body: 'Great Sun' },
  { id: 234543, user_id: 6814118, title: 'The Moon', body: 'Great Moon' },
];

let mockModelComment: Comment[] = [
  {
    id: 342562,
    post_id: 123456,
    name: 'Frank',
    email: 'frank@gmial.com',
    body: 'I like your post!',
  },
];

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let userService: UserService;
  let postService: PostService;
  let commentService: CommentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostListComponent],
      imports: [
        CommonModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        MatIconModule,
        PostRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
      providers:[AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    postService = TestBed.inject(PostService);
    commentService = TestBed.inject(CommentService);
  });

  beforeEach(() => {

    spyOn(userService, 'getUsers').and.returnValue(of(mockModel));
    spyOn(postService, 'getUserPost').and.returnValue(of(mockModelPost));
    spyOn(commentService, 'getComment').and.returnValue(of(mockModelComment));

    component.ngOnInit();

    forkJoin([
      userService.getUsers(10),
      postService.getUserPost(mockModel[0].id),
      commentService.getComment(mockModelPost[0].id),
    ]).subscribe(() => {
      component.users = mockModel;
      component.posts = mockModelPost;
      component.comments = mockModelComment;

      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the post-list', () => {
    expect(postService.getUserPost(mockModelPost[0].user_id)).toBeTruthy();
    expect(component.posts).toEqual(mockModelPost);

    // let postList = fixture.nativeElement.querySelector('.post-block');
    // expect(postList.innerHTML).toContain(mockModel[0].title);
  });

  it('should show and hide the add-post form', () => {
    let form = fixture.nativeElement.querySelector('.form-section form');
    let showBtn = fixture.nativeElement.querySelector('.modify-section button');

    expect(form).toBeFalsy();
    showBtn.click();
    fixture.detectChanges();

    let shownForm = fixture.nativeElement.querySelector('.form-section form');

    expect(shownForm).toBeTruthy();
  });

  it('should submit the add-form with the button click and create the post', () => {
    let showBtn = fixture.nativeElement.querySelector('.modify-section button');

    showBtn.click();
    fixture.detectChanges();

    let form = fixture.nativeElement.querySelector('.form-section form');
    let post = (form.value = {
      title: 'test',
      body: 'test',
      user_id: 2693647,
      id: 342789,
    });

    let spyService = spyOn(postService, 'addPost').and.returnValue(
      of(mockModelPost)
    );

    component.createPost(post);
    fixture.detectChanges();

    expect(spyService).toHaveBeenCalledTimes(1);
    expect(spyService).toHaveBeenCalledWith(post);
  });

  it('should search a post', () => {
    let spyService = spyOn(postService, 'searchPost').and.returnValue(
      of(mockModelPost)
    );
    let searchValue = 'Sun';
    component.searchPost(searchValue);
    fixture.detectChanges();

    expect(spyService).toHaveBeenCalledTimes(1);
    expect(spyService).toHaveBeenCalledWith(searchValue);
  });

  it('should delete a post', () => {
    let result: Post[] = [
      { id: 234543, user_id: 6814118, title: 'The Sun', body: 'Great Sun' },
    ];
    let spyService = spyOn(postService, 'deleteUserPost').and.returnValue(
      of(result)
    );
    let spyWindow = spyOn(window, 'confirm').and.returnValue(true);

    component.deletePost(mockModelPost[0]);
    expect(spyWindow).toBeTruthy();
    fixture.detectChanges();

    expect(spyService).toHaveBeenCalledWith(mockModelPost[0]);
  });

  it('should show the comments', () => {
    expect(component.checkIfHasComment(mockModelPost[0].id)).toBe(true);

    component.checkIfHasComment(mockModelPost[0].id);
    fixture.detectChanges();

    let btn = fixture.nativeElement.querySelector('.showBtn');
    expect(btn).toBeTruthy();

    btn.click()
    fixture.detectChanges()

    let comments = fixture.nativeElement.querySelectorAll('.comment-container');
    expect(comments).toBeTruthy()
    expect(comments.length).toEqual(2)
  });
});
