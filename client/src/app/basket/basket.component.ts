import { Component, OnInit } from '@angular/core';
import { Product } from '../_models/product';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  cart = [];

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.showItems();
  }
  showItems() {
    this.cart = JSON.parse(sessionStorage.getItem("cart")); 
  }
  
}
