import { Component, OnInit } from '@angular/core';
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
    this.getUserId();
  }
  showItems() {
    this.cart = JSON.parse(sessionStorage.getItem("cart"));
  }

  buyItems(i:any) {
    let myObj: Order;
    myObj = {};
    myObj.customerId = this.userId;
    myObj.productName = this.cart[i].name;
    myObj.productPrice = this.cart[i].price;
    this.ordersService.addOrder(myObj).subscribe(()=>{});
    this.removeItem(i);
    this.toast.success("Proizvod kupljen!");
  }

  getUserId() {
    this.userId =this.accountService.getUserId();    
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
