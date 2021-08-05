import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../_services/orders.service';
import { Order } from '../../_models/order'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[];
  order: Order;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.ordersService.getOrders().subscribe(orders => {
      this.orders = orders;
    })
  }
}
