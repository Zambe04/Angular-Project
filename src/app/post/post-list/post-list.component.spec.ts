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
import { of } from 'rxjs';
import { Post } from '../post';

let mockModel: Post[] = [
  { id: 123456, user_id: 7849302, title: 'The Sun', body: 'Great Sun' },
  { id: 234543, user_id: 3804624, title: 'The Moon', body: 'Great Moon' },
];

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let service: PostService;

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
    }).compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PostService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the post-list', () => {
    spyOn(service, 'getPost').and.returnValue(of(mockModel));

    component.ngOnInit();
    fixture.detectChanges();

    expect(service.getPost()).toBeTruthy();
    expect(component.posts).toEqual(mockModel);

    let postList = fixture.nativeElement.querySelector('.post-block');

    expect(postList.innerHTML).toContain(mockModel[0].title);
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

    let spyService = spyOn(service, 'addPost').and.returnValue(of(mockModel));

    component.createPost(post);
    fixture.detectChanges();

    expect(spyService).toHaveBeenCalledTimes(1);
    expect(spyService).toHaveBeenCalledWith(post);
  });

  it('should search a post', () => {
    let spyService = spyOn(service, 'searchPost').and.returnValue(
      of(mockModel)
    );
    let searchValue = 'Sun';
    component.searchPost(searchValue);
    fixture.detectChanges();

    expect(spyService).toHaveBeenCalledTimes(1);
    expect(spyService).toHaveBeenCalledWith(searchValue);
  });

  it('should delete a post', () => {
    let result: Post[] = [
      { id: 123456, user_id: 7849302, title: 'The Sun', body: 'Great Sun' },
    ];
    let spyService = spyOn(service, 'deleteUserPost').and.returnValue(
      of(result)
    );
    let spyWindow = spyOn(window, 'confirm').and.returnValue(true);
    let title = fixture.nativeElement.querySelector('.post-block h3');
    let body = fixture.nativeElement.querySelector('.post-block p');

    component.deletePost(mockModel[1]);
    expect(spyWindow).toBeTruthy();
    fixture.detectChanges();

    expect(spyService).toHaveBeenCalledWith(mockModel[1].id);
    expect(title).toBeNull();
    expect(body).toBeNull();
  });
});
