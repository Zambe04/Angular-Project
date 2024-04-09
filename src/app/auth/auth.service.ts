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
    this.token = token;
    localStorage.setItem('token', token);
    return this.isLoggedIn = true;
  }

  getToken(){
    if (this.token) {
      return this.token;
    }
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
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

