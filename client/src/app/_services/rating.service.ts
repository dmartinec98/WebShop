import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ocijena } from '../_models/ocijena';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getRating(id: number) {
    return this.http.get<Ocijena[]>(this.baseUrl + 'Rating/getrating/' + id);
  }

  addRating(ocijena: Ocijena) {
    return this.http.post<Ocijena>(this.baseUrl + 'Rating/addrating', ocijena);
  }

}
