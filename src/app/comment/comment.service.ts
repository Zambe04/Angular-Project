import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Comment } from './comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  baseURL = 'https://gorest.co.in/public/v2/posts';
  token = `Bearer ${localStorage.getItem('token')}`;
  headers = new HttpHeaders().set('Authorization', this.token);
  authService: any;

  constructor(private http: HttpClient) {}

  getComment(id: number): Observable<Comment[]> {
    return this.http
      .get<Comment[]>(`${this.baseURL}/${id}/comments`, {
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

  createPostComment(post_id: number, comment: Comment): Observable<Comment[]> {
    return this.http
      .post<Comment[]>(`${this.baseURL}/${post_id}/comments`, comment, {
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
