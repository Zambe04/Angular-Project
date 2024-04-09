import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../auth.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatTabsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParams: of({}) } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method on form submit', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'setToken').and.returnValue(true);

    const tokenInput = fixture.nativeElement.querySelector('input[name=token]');
    const form = fixture.nativeElement.querySelector('form');

    tokenInput.value =
      '02902485391b31c01f3eb8827657ba693db7c64ffdb10413990f61aa86055690';
    tokenInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    form.dispatchEvent(new Event('submit'));
    expect(authService.setToken).toHaveBeenCalledWith(
      '02902485391b31c01f3eb8827657ba693db7c64ffdb10413990f61aa86055690'
    );
  });

  it('should not submit until token is correct', () => {
    const tokenInput = fixture.nativeElement.querySelector('input[name=token]');
    const btn = fixture.nativeElement.querySelector(
      'button[mat-flat-button][disabled]'
    );

    tokenInput.value = 'not valid token';
    fixture.detectChanges();

    expect(btn).toBeTruthy();
  });
});
