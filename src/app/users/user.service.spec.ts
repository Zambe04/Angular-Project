import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from './users';
import { of } from 'rxjs';

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
  let service: UserService;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient],
    }).compileComponents();

    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an user-list', () => {
    let spyService = spyOn(service, 'getUsers').and.callFake(() => {
      return of(mockModel);
    });

    expect(service.getUsers()).toBeTruthy();
    expect(spyService).toHaveBeenCalledTimes(1);
  });

  it('should delete an user', () => {
    let spyService = spyOn(service, 'deleteUser').and.callFake(() => {
      return of(mockModel);
    });

    expect(service.deleteUser(1234567)).toBeTruthy();
    expect(spyService).toHaveBeenCalledTimes(1);
  });

  it('should add a new User', () => {
    let spyService = spyOn(service, 'addUser').and.callFake(() => {
      return of(mockModel);
    });

    expect(service.addUser(mockModel[0])).toBeTruthy();
    expect(spyService).toHaveBeenCalledTimes(1);
  });

  it('should search a value in the user-list', () => {
    let searchValue = 'Pi';
    let spyService = spyOn(service, 'searchUser').and.callFake(() => {
      return of(mockModel.filter(user => user.name.toLowerCase().includes(searchValue.toLowerCase())));
    });

    expect(service.searchUser(searchValue)).toBeTruthy();
    expect(spyService).toHaveBeenCalledTimes(1);

  });
});
