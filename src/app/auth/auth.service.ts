import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token!: string;
  isLoggedIn: boolean = false
  btndisabled:boolean = false

  constructor() { }

  setToken(token: string): boolean {
    if (token === '') {
      this.isLoggedIn = false
      return false
    }
    this.token = token;
    localStorage.setItem('token', token);
    this.isLoggedIn = true;
    return true
  }

  getToken(){
    if (this.token) {
      this.isLoggedIn = true;
      return this.token;
    }
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.isLoggedIn = true;
      this.token = storedToken;
      return storedToken;
    }
    return null;
  }

  logout() {
    this.token = '';
    localStorage.removeItem('token');
    this.isLoggedIn = false
  }
}


