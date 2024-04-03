import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token!: string;

  constructor() { }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
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
  }
}

