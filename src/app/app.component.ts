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
    this.navTo('users', 0);
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
          this.navTo('users', 0)
          break;
        case 1:
          this.navTo('post', 1)
          break;
        case 2:
          this.navTo('login', 2)
          break;
      }
    }
  }

  logout() {
    this.authService.logout();
    this.navTo('login', 2);
  }
}
