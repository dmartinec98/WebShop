import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.baseUrl + 'products');
  }

  getProduct(id: number) {
    return this.http.get<Product>(this.baseUrl +'products/' + id);
  }

  addProduct(model: any) {
    return this.http.post(this.baseUrl + 'products/addproduct', model);
  }

  setMainPhoto(productId: number, photoId: number) {
    return this.http.put(this.baseUrl + 'products/'+ productId + '/set-main-photo/' + photoId, {});
  }

  deletePhoto(productId: number, photoId: number) {
    return this.http.delete(this.baseUrl + 'products/'+ productId + '/delete-photo/'+ photoId);
  }


}
