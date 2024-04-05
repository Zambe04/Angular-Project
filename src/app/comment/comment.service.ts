import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from './comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  baseURL = 'https://gorest.co.in/public/v2/comments';
  token = `Bearer ${localStorage.getItem('token')}`;
  headers = new HttpHeaders().set('Authorization', this.token);

  constructor(private http: HttpClient) {}

  getComment(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.baseURL, { headers: this.headers });
  }
}
