import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('authGuard', () => {
  let service: AuthService;
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if user is logged in', async () => {
    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {} as any;

    const token = 'test_token';
    service.setToken(token);
    const result = await TestBed.runInInjectionContext(() =>
      authGuard(route, state)
    );

    expect(service.isLoggedIn).toEqual(true);
    expect(result).toEqual(service.isLoggedIn);
  });

  it('should return false if user is not logged in', async () => {
    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {} as any;

    service.logout();
    const result = await TestBed.runInInjectionContext(() =>
      authGuard(route, state)
    );

    expect(service.isLoggedIn).toEqual(false);
    expect(result).toEqual(service.isLoggedIn);
  });
});
