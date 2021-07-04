import { Component, Input, OnInit } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/_models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;

  constructor(private toast: ToastrService) { }

  ngOnInit(): void {
  }

  addtocart() {
    var chart = JSON.parse(sessionStorage.getItem("cart"));
    if(chart == null) chart = [];
    chart.push(this.product);
    sessionStorage.setItem('cart', JSON.stringify(chart));
    this.toast.success("Proizvod dodan na listu želja");
  }

}
