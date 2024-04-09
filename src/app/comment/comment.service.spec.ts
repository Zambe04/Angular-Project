import { TestBed } from '@angular/core/testing';
import { CommentService } from './comment.service';
import { HttpClientModule } from '@angular/common/http';

describe('CommentService', () => {
  let service: CommentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    }).compileComponents()
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
