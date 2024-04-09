import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from './users';

describe('UserService', () => {
  let service: UserService;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient]
    }).compileComponents();

    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an user-list', () => {
    service.getUsers().subscribe((data) => {
      expect(Array.isArray(data)).toBeTruthy();
    });
  });

  it('should delete an user', () => {
    const id = 1234567;
    const response: User[] = [];

    service.deleteUser(id).subscribe((data) => {
      expect(data).toEqual(response);
    });
  });
});
