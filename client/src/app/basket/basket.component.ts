import { Component, OnInit, Output } from '@angular/core';
import { Order } from '../_models/order';
import { Product } from '../_models/product';
import { AccountService } from '../_services/account.service';
import { OrdersService } from '../_services/orders.service';
import { plainToClass } from 'class-transformer';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  cart = [];
  userId: number;
  order: Order;
  model: any = {};


  constructor(public accountService: AccountService, private ordersService: OrdersService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.showItems();
  }
  showItems() {
    this.cart = JSON.parse(sessionStorage.getItem("cart"));
  }

  buyItems(i:any) {
    this.userId = JSON.parse(localStorage.getItem('userid'));
    console.log(this.userId);
    this.order = {};
    this.order.customerId = this.userId;
    this.order.productName = this.cart[i].name;
    this.order.productPrice = this.cart[i].price;
    this.order.pictureUrl = this.cart[i].photoUrl;
    this.ordersService.addOrder(this.order).subscribe(()=>{});
    this.removeItem(i);
    this.toast.success("Proizvod kupljen!");
  }

  removeItem(index) {
    var tempList = this.cart;
    this.cart = [];

    for (var j = 0; j < tempList.length; j++) {
      if (j != index)
        this.cart.push(tempList[j]);
    }
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
    this.toast.success("Proizvod izbrisan iz liste želja");
  }

  notLoggedIn() {
    this.toast.error("Niste ulogirani! Za kupnju proizvoda molimo da se prijavite!")
  }

  konzola(){
    console.log(this.cart);
  }



}
