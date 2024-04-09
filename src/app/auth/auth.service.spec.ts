import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the token', () => {
    const token = 'test_token';
    const result = service.setToken(token);

    expect(localStorage.getItem('token')).toEqual(token);
    expect(result).toBeTrue();
    expect(service.isLoggedIn).toBeTrue()
  });

  it('should get the token', () => {
    const result = service.getToken();
    const storedToken = localStorage.getItem('token');

    expect(result).toEqual(storedToken);
  });

  it('should logout', () => {
    const result = service.logout()

    expect(localStorage.getItem('token')).toBeNull()
    expect(service.isLoggedIn).toBeFalse()
    expect(result).toBeUndefined()
  })
});
