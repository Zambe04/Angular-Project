import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should set token correctly', () => {
    const token = 'your-token';
    authService.setToken(token);
    expect(authService.getToken()).toEqual(token);
    expect(authService.isLoggedIn).toBeTrue();
  });

  it('should get token correctly from localStorage', () => {
    const token = 'your-token';
    localStorage.setItem('token', token);

    expect(authService.getToken()).toEqual(token);
    expect(authService.isLoggedIn).toBeTrue();
  });

  it('should return null when no token is set', () => {
    localStorage.removeItem('token');
    expect(authService.getToken()).toBeNull();
    expect(authService.isLoggedIn).toBeFalse();
  });

  it('should logout correctly', () => {
    const token = 'your-token';
    authService.setToken(token);
    authService.logout();
    expect(authService.getToken()).toBeNull();
    expect(authService.isLoggedIn).toBeFalse();
  });
});
