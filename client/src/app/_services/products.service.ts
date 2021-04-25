import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = environment.apiUrl;
  products: Product[] = [];
  paginatedResult: PaginatedResult<Product[]> = new PaginatedResult<Product[]>();

  constructor(private http: HttpClient) { }

  getProducts(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http.get<Product[]>(this.baseUrl + 'products', {observe: 'response', params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if(response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
      })
    );
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
