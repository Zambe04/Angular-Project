import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from './post.service';
import { of } from 'rxjs';
import { Post } from './post';

let mockModel: Post[] = [
  {
    id: 123456,
    user_id: 4638904,
    title: 'Test_Title',
    body: 'Test_body',
  },
];

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the post-list', () => {
    let spyService = spyOn(service, 'getPost').and.callFake(() => {
      return of(mockModel);
    });

    expect(service.getPost()).toBeTruthy();
    expect(spyService).toHaveBeenCalledTimes(1);
  });

  it('should add a new post', () => {
    let spyService = spyOn(service, 'addPost').and.callFake(() => {
      return of(mockModel);
    });

    expect(service.addPost(mockModel[0])).toBeTruthy();
    expect(spyService).toHaveBeenCalledTimes(1);
  });

  it('should delete a post from the post_id', () => {
    let spyService = spyOn(service, 'deleteUserPost').and.callFake(() => {
      return of(mockModel);
    });

    expect(service.deleteUserPost(mockModel[0].id)).toBeTruthy();
    expect(spyService).toHaveBeenCalledTimes(1);
  });

  it('should search a post from the searchValue', () => {
    let spyService = spyOn(service, 'searchPost').and.callFake(() => {
      return of(mockModel);
    });
    let searchValue = 'Test';

    expect(service.searchPost(searchValue)).toBeTruthy();
    expect(spyService).toHaveBeenCalledTimes(1);
  });
});
