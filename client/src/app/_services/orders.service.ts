import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxGalleryThumbnailsComponent } from '@kolkov/ngx-gallery';
import { environment } from 'src/environments/environment';
import { Order } from '../_models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;
  

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get<Order[]>(this.baseUrl + 'orders/getorders');
  }

  getOrderForUser(id: number) {
    return this.http.get<Order[]>(this.baseUrl + 'orders/getorders/' + id);
  }

  addOrder(order: Order) {
    return this.http.post<Order>(this.baseUrl + 'orders/addorder', order);
  }
}

