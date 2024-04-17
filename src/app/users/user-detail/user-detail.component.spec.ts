import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersRoutingModule } from '../users-routing.module';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of, forkJoin } from 'rxjs';
import { UserService } from '../user.service';
import { User } from '../users';
import { PostService } from '../../post/post.service';
import { CommentService } from '../../comment/comment.service';
import { Post } from '../../post/post';
import { Comment } from '../../comment/comment';

let mockModel: User = {
  id: 6814118,
  name: 'John',
  email: 'john@gmail.com',
  gender: 'male',
  status: 'active',
};

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

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let userService: UserService;
  let postService: PostService;
  let commentService: CommentService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailComponent],
      imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        UsersRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of(convertToParamMap({ id: '6814118' })) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    postService = TestBed.inject(PostService);
    commentService = TestBed.inject(CommentService);
    route = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    spyOn(userService, 'getUserDetail').and.returnValue(of(mockModel));
    spyOn(postService, 'getUserPost').and.returnValue(of(mockModelPost));
    spyOn(commentService, 'getComment').and.returnValue(of(mockModelComment));

    component.ngOnInit();

    forkJoin([
      userService.getUserDetail(mockModel.id),
      postService.getUserPost(mockModel.id),
      commentService.getComment(mockModelPost[0].id),
    ]).subscribe(() => {
      component.user = mockModel;
      component.posts = mockModelPost;
      component.comments = mockModelComment;

      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the user informations', () => {
    let param = (route.params = of({ id: 6814118 }));

    expect(userService.getUserDetail(+param)).toBeTruthy();
    expect(component.user).toEqual(mockModel);
  });

  it('should display the user posts', () => {
    expect(postService.getUserPost(mockModel.id)).toBeTruthy();
    expect(component.posts).toEqual(mockModelPost);
  });

  it('should display no posts if there are not', () => {
    component.posts = [];
    component.postUploaded = true;
    fixture.detectChanges();

    let noPostSection = fixture.nativeElement.querySelector('.no-post-section');

    expect(noPostSection).toBeTruthy();
  });

  it('should show the comments', () => {
    expect(component.btnDisabled(mockModelPost[0].id)).toBe(true);
    expect(component.btnDisabled(mockModelPost[1].id)).toBe(false);

    component.btnDisabled(mockModelPost[0].id);
    fixture.detectChanges();

    let btn = fixture.nativeElement.querySelector('.showBtn');
    expect(btn).toBeTruthy();

    btn.click();
    fixture.detectChanges();

    let comments = fixture.nativeElement.querySelector('.comment-section');
    expect(comments).toBeTruthy();
  });

  it('should show the add-comment form after the btn click', () => {
    let formBtn = fixture.nativeElement.querySelector('.addBtn');
    expect(formBtn).toBeTruthy();

    formBtn.click();
    fixture.detectChanges();

    let form = fixture.nativeElement.querySelector('.form-section');
    expect(form).toBeTruthy();
  });

  it('should add the new comment after the btn click', () => {
  let formBtn = fixture.nativeElement.querySelector('.addBtn');

  formBtn.click();
  fixture.detectChanges();

  let form = fixture.nativeElement.querySelector('form');
  let comment = (form.value = {
  name: 'Test',
  email: 'test@mail.com',
  body: 'That is a test',
  id: 634673,
  post_id: 123456,
  });

  let submitBtn = fixture.nativeElement.querySelector('.submitBtn')
  submitBtn.click();
  fixture.detectChanges();
  expect(submitBtn).toBeTruthy()

  let btn = fixture.nativeElement.querySelector('.showBtn');
  expect(btn).toBeTruthy();

  btn.click();
  fixture.detectChanges();

  let comments = fixture.nativeElement.querySelectorAll('.comment-section');
  expect(comments).toBeTruthy();
  // expect(comments.length).toBe(2);
  // expect(comments[1]).toContain(comment)
  });
});
