import { TestBed } from '@angular/core/testing';
import { CommentService } from './comment.service';
import { HttpClientModule } from '@angular/common/http';
import { Comment } from './comment';
import { of } from 'rxjs';

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
];

describe('CommentService', () => {
  let service: CommentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the comments-list', () => {
    let spyService = spyOn(service, 'getComment').and.callFake(() => {
      return of(mockModel);
    });

    expect(service.getComment()).toBeTruthy();
    expect(spyService).toHaveBeenCalledTimes(1);
  });
});
