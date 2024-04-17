import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { User } from './users';
import { AuthService } from '../auth/auth.service';

let mockModel: User[] = [
  {
    id: 1234567,
    name: 'Piero',
    email: 'piero@gmmail.com',
    gender: 'male',
    status: 'active',
  },
];

describe('UserService', () => {
  let service: jasmine.SpyObj<UserService>;
  let authService: AuthService;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [HttpClient, UserService],
    }).compileComponents();

    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    authService = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an user-list', () => {
    let numb = 1;
    service.getUsers(numb).subscribe((users) => {
      expect(users.length).toBe(numb);
    });

    const req = http.expectOne(`${service.baseURl}?page=1&per_page=${numb}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(service.token);
    req.flush(mockModel);
  });

  it('should handle 401 error during getUsers', () => {
    const errorResponse = { status: 401, statusText: 'Unauthorized' };
    const numb = 10;

    spyOn(authService, 'logout');

    service.getUsers(numb).subscribe({
      next: (users: User[]) => {
        fail('Expected error to be thrown');
      },
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.status).toBe(401);
        expect(authService.logout).toHaveBeenCalled();
      },
    });

    const req = http.expectOne(`${service.baseURl}?page=1&per_page=${numb}`);
    expect(req.request.method).toBe('GET');
    req.flush('Error', errorResponse);
  });

  it('should delete an user', () => {
    service.deleteUser(mockModel[0].id).subscribe((users) => {
      let userDeleted = !users.some((user) => user.id == mockModel[0].id);
      expect(userDeleted).toBeTrue();
    });

    const req = http.expectOne(`${service.baseURl}/${mockModel[0].id}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe(service.token);
    req.flush([]);
  });

  it('should handle 401 error during deleteUser', () => {
    const errorResponse = { status: 401, statusText: 'Unauthorized' };
    const id = 0;

    spyOn(authService, 'logout');

    service.deleteUser(id).subscribe({
      next: () => {
        fail('Expected error to be thrown');
      },
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.status).toBe(401);
        expect(authService.logout).toHaveBeenCalled();
      },
    });

    const req = http.expectOne(`${service.baseURl}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush('Error', errorResponse);
  });

  it('should add a new User', () => {
    let newUser: User = {
      id: 6357622,
      name: 'Frank',
      email: 'frank@gmial.com',
      gender: 'male',
      status: 'active',
    };

    service.addUser(newUser).subscribe((users) => {
      let userAdded = users.some((user) => user.id == newUser.id);
      expect(userAdded).toBeTrue();
    });

    const req = http.expectOne(`${service.baseURl}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(service.token);
    req.flush([...mockModel, newUser]);
  });

  it('should handle 401 error during addUser', () => {
    const errorResponse = { status: 401, statusText: 'Unauthorized' };
    const newUser = {
      id: 1,
      name: 'test',
      email: 'test@gmial.com',
      gender: 'male',
      status: 'inactive',
    };

    spyOn(authService, 'logout');

    service.addUser(newUser).subscribe({
      next: () => {
        fail('Expected error to be thrown');
      },
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.status).toBe(401);
        expect(authService.logout).toHaveBeenCalled();
      },
    });

    const req = http.expectOne(`${service.baseURl}`);
    expect(req.request.method).toBe('POST');
    req.flush('Error', errorResponse);
  });

  it('should search a value in the user-list', () => {
    let searchValue = 'Pi';

    service.searchUser(searchValue).subscribe((users) => {
      let searchUser = users.filter((user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase())
      );

      expect(searchUser).toBeTruthy();
    });

    const req = http.expectOne(`${service.baseURl}/?name=${searchValue}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(service.token);
    req.flush(
      mockModel.filter((user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  });
});
