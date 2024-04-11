import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Post } from './post';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  baseURL = 'https://gorest.co.in/public/v2/posts';
  URl = 'https://gorest.co.in/public/v2/users';
  token = `Bearer ${localStorage.getItem('token')}`;
  headers = new HttpHeaders().set('Authorization', this.token);

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserPost(user_id: number): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${this.URl}/${user_id}/posts`, {headers: this.headers,}).pipe(
        catchError((error) => {
          if (error.status === 401) {
            alert('Your session has expired! Please login again.');
            this.authService.logout();
          } else {
            console.log(error);
          }
          return [];
        })
      );
  }

  addPost(post: Post): Observable<Post[]> {
    return this.http
      .post<Post[]>(`${this.URl}/${post.user_id}/posts`, post, {
        headers: this.headers,
      })
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            alert('Your session has expired! Please login again.');
            this.authService.logout();
          } else {
            console.log(error);
          }
          return [];
        })
      );
  }

  searchPost(searchValue: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseURL}/?title=${searchValue}`);
  }

  deleteUserPost(post: Post): Observable<Post[]> {
    return this.http
      .delete<Post[]>(`${this.baseURL}/${post.id}`, {
        headers: this.headers,
      })
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            alert('Your session has expired! Please login again.');
            this.authService.logout();
          } else {
            console.log(error);
          }
          return [];
        })
      );
  }
}
