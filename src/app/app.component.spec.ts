import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { LoginComponent } from './auth/login/login.component';
import { PostListComponent } from './post/post-list/post-list.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let service: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatTabsModule,
        AppRoutingModule,
      ],
      declarations: [AppComponent],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Progetto-Angular'`, () => {
    expect(app.title).toEqual('Progetto-Angular');
  });

  it('should alert to login first', () => {
    const isLoggedIn = false;
    const spy = spyOn(window, 'alert');

    const event: MatTabChangeEvent = { index: 0 } as MatTabChangeEvent;
    app.onTabChanged(event);

    expect(isLoggedIn).toBeFalse();
    expect(app.selectedIndex).toEqual(2);
    expect(spy).toHaveBeenCalledOnceWith('Please login!');
  });

  it('should navigate when logged in', () => {
    const spy = spyOn(router, 'navigate');
    const event: MatTabChangeEvent = { index: 0 } as MatTabChangeEvent;
    service.setToken('test_token');

    app.onTabChanged(event);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(['/users']);
    expect(app.selectedIndex).toEqual(0);
  });

  it('should logout', () => {
    const spy = spyOn(router, 'navigate');

    app.logout();
    fixture.detectChanges();

    expect(localStorage.getItem('token')).toBeNull();
    expect(app.selectedIndex).toEqual(2);
    expect(spy).toHaveBeenCalledWith(['/login']);
  });

  it('should return users-list when click on home icon', () => {
    const btn = fixture.nativeElement.querySelector('button[name=user-list]');
    const spy = spyOn(router, 'navigate');

    btn.click();
    fixture.detectChanges();

    expect(app.selectedIndex).toEqual(0);
    expect(spy).toHaveBeenCalledWith(['/users']);
  });
});
