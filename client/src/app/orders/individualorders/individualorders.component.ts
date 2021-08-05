import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Order } from 'src/app/_models/order';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { OrdersService } from 'src/app/_services/orders.service';

@Component({
  selector: 'app-individualorders',
  templateUrl: './individualorders.component.html',
  styleUrls: ['./individualorders.component.css']
})
export class IndividualordersComponent implements OnInit {
  orders: Order[];
  order: Order;
  user: User;

  constructor(private ordersService: OrdersService, private accountService: AccountService) {
  } 

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.ordersService.getOrderForUser(this.accountService.getUserId()).subscribe(response => {
      this.orders = response;
    })
  }
}
