import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Progetto-Angular';
  selectedIndex!: number;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.navTo('login', 2);
  }

  navTo(path: string, index: number) {
    this.selectedIndex = index;
    this.router.navigate([`/${path}`]);
  }

  openUsersList() {
    // inserire controllo del login
    // if (!this.authService.isLoggedIn()) {
    // alert('You must log in first!')
    // return this.navToLogin();
    // } else {
    this.navTo('users', 0);
    // }
  }

  onTabChanged(event: MatTabChangeEvent): void {
    if (!this.authService.isLoggedIn) {
      this.selectedIndex = 2;
      if(event.index != 2){
        alert('Please login!')
      }
    } else {
      switch (event.index) {
        case 0:
          this.router.navigate(['/users']);
          break;
        case 1:
          this.router.navigate(['/post']);
          break;
        case 2:
          this.router.navigate(['/login']);
          break;
      }
    }
  }

  logout() {
    this.authService.logout();
    this.navTo('login', 2);
  }
}
