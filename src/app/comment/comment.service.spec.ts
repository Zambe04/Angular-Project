import { TestBed } from '@angular/core/testing';
import { CommentService } from './comment.service';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Comment } from './comment';
import { AuthService } from '../auth/auth.service';

let mockModel: Comment[] = [
  {
    id: 123345,
    post_id: 123456,
    name: 'Piero',
    email: 'pierino@gmmail.com',
    body: 'I like it!',
  },
  {
    id: 123455,
    post_id: 123456,
    name: 'Anne',
    email: 'anne@ggmal.com',
    body: 'I hate it!',
  },
  {
    id: 643764,
    post_id: 123456,
    name: 'Frank',
    email: 'frank@gmial.com',
    body: 'Hi!',
  },
];

describe('CommentService', () => {
  let service: CommentService;
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    }).compileComponents();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentService);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the comments-list', () => {
    service.getComment(1).subscribe((comments) => {
      expect(comments).toEqual(mockModel);
    });

    const req = httpMock.expectOne(`${service.baseURL}/1/comments`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(service.token);
    req.flush(mockModel);
  });

  it('should handle 401 error during getComment', () => {
    const errorResponse = { status: 401, statusText: 'Unauthorized' };
    const id = 1;

    spyOn(authService, 'logout');

    service.getComment(id).subscribe({
      next: () => {
        fail('Expected error to be thrown');
      },
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.status).toBe(401);
        expect(authService.logout).toHaveBeenCalled();
      },
    });

    const req = httpMock.expectOne(`${service.baseURL}/${id}/comments`);
    expect(req.request.method).toBe('GET');
    req.flush('Error', errorResponse);
  });

  it('should create a new commment', () => {
    let newComment: Comment = {
      id: 643764,
      post_id: 123456,
      name: 'Frank',
      email: 'frank@gmial.com',
      body: 'Hi!',
    };

    service
      .createPostComment(newComment.post_id, newComment)
      .subscribe((comments) => {
        const commentExists = comments.some(
          (comment) =>
            comment.id === newComment.id &&
            comment.post_id === newComment.post_id &&
            comment.name === newComment.name &&
            comment.email === newComment.email &&
            comment.body === newComment.body
        );
        expect(commentExists).toBeTrue();
      });

    const req = httpMock.expectOne(
      `${service.baseURL}/${newComment.post_id}/comments`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(service.token);
    req.flush(mockModel);
  });

  it('should handle 401 error during createPostComment', () => {
    const errorResponse = { status: 401, statusText: 'Unauthorized' };
    const id = 1;
    const newComment = {
      id: 4,
      post_id: 1,
      name: 'Test',
      email: 'test@gmial.com',
      body: 'Hi!',
    };

    spyOn(authService, 'logout');

    service.createPostComment(id, newComment).subscribe({
      next: () => {
        fail('Expected error to be thrown');
      },
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.status).toBe(401);
        expect(authService.logout).toHaveBeenCalled();
      },
    });

    const req = httpMock.expectOne(`${service.baseURL}/${id}/comments`);
    expect(req.request.method).toBe('POST');
    req.flush('Error', errorResponse);
  });
});
