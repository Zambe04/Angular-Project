import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { User } from './users';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURl = 'https://gorest.co.in/public/v2/users';
  token = `Bearer ${localStorage.getItem('token')}`;
  headers = new HttpHeaders().set('Authorization', this.token);

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURl, { headers: this.headers })
    // .pipe(
      // catchError((error) => {
        // if (error.status === 401) {
          // alert('Your session has expired! Please login again.');
          // this.authService.logout();
        // } else {
          // console.log(error);
        // }
        // return [];
      // })
    // );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.baseURl + `/${id}`, { headers: this.headers })
    // .pipe(
      // catchError((error) => {
        // if (error.status === 401) {
          // alert('Your session has expired! Please login again.');
          // this.authService.logout();
        // } else {
          // console.log(error);
        // }
        // return [];
      // })
    // );
  }
}
