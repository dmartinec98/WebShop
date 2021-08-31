import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Komentar } from '../_models/komentar';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = environment.apiUrl;
  

  constructor(private http: HttpClient) { }

  getComment(id: number) {
    return this.http.get<Komentar[]>(this.baseUrl + 'Comment/getcomments/' + id);
  }

  addComment(komentar: Komentar) {
    return this.http.post<Komentar>(this.baseUrl + 'Comment/addcomment', komentar);
  }
}
