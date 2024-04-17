import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PostService } from './post.service';
import { Post } from './post';
import { AuthService } from '../auth/auth.service';

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
  let http: HttpTestingController;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    }).compileComponents();

    TestBed.configureTestingModule({});
    service = TestBed.inject(PostService);
    http = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the post-list', () => {
    service.getUserPost(mockModel[0].user_id).subscribe((posts) => {
      expect(posts).toEqual(mockModel);
    });

    const req = http.expectOne(`${service.URl}/${mockModel[0].user_id}/posts`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(service.token);
    req.flush(mockModel);
  });

  it('should handle 401 error during getUserPost', () => {
    const errorResponse = { status: 401, statusText: 'Unauthorized' };
    const id = 532;

    spyOn(authService, 'logout');

    service.getUserPost(id).subscribe({
      next: (post: Post[]) => {
        fail('Expected error to be thrown');
      },
      error: (error: HttpErrorResponse) => {
        expect(error).toBeDefined();
        expect(error.status).toBe(401);
        expect(authService.logout).toHaveBeenCalled();
      },
    });

    const req = http.expectOne(`${service.URl}/${id}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush('Error', errorResponse);
  });

  it('should add a new post', () => {
    let newPost: Post = {
      id: 346233,
      user_id: 4638904,
      title: 'Title',
      body: 'Body',
    };

    service.addPost(newPost).subscribe((posts) => {
      const postExists = posts.some((post) => post.id === newPost.id);
      expect(postExists).toBeTrue();
    });

    const req = http.expectOne(`${service.URl}/${newPost.user_id}/posts`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(service.token);
    req.flush([...mockModel, newPost]);
  });

  it('should handle 401 error during addPost', () => {
    const errorResponse = { status: 401, statusText: 'Unauthorized' };
    const newPost = {
      id: 17246,
      user_id: 1,
      title: 'Title',
      body: 'Body',
    };

    spyOn(authService, 'logout');

    service.addPost(newPost).subscribe({
      next: () => {
        fail('Expected error to be thrown');
      },
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.status).toBe(401);
        expect(authService.logout).toHaveBeenCalled();
      },
    });

    const req = http.expectOne(`${service.URl}/${newPost.user_id}/posts`);
    expect(req.request.method).toBe('POST');
    req.flush('Error', errorResponse);
  });

  it('should delete a post from the post_id', () => {
    service.deleteUserPost(mockModel[0]).subscribe((posts) => {
      let postDeleted = !posts.some((post) => post.id == mockModel[0].id);
      expect(postDeleted).toBeTrue();
    });

    const req = http.expectOne(`${service.baseURL}/${mockModel[0].id}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe(service.token);
    req.flush([]);
  });

  it('should handle 401 error during deleteUserPost', () => {
    const errorResponse = { status: 401, statusText: 'Unauthorized' };
    const deletePost = {
      id: 1,
      user_id: 1,
      title: 'Title',
      body: 'Body',
    };

    spyOn(authService, 'logout');

    service.deleteUserPost(deletePost).subscribe({
      next: () => {
        fail('Expected error to be thrown');
      },
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.status).toBe(401);
        expect(authService.logout).toHaveBeenCalled();
      },
    });

    const req = http.expectOne(`${service.baseURL}/${deletePost.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush('Error', errorResponse);
  });

  it('should search a post from the searchValue', () => {
    let searchValue = 'Test';

    service.searchPost(searchValue).subscribe((posts) => {
      let searchPost = posts.filter((post) => {
        post.title.toLowerCase().includes(searchValue.toLowerCase());
      });
      expect(searchPost).toBeTruthy();
    });

    let req = http.expectOne(`${service.baseURL}/?title=${searchValue}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(service.token);
    req.flush(
      mockModel.filter((post) => {
        post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    );
  });
});
