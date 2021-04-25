import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from '../_models/pagination';
import { Product } from '../_models/product';
import { ProductParams } from '../_models/productParams';
import { AccountService } from '../_services/account.service';
import { ProductsService } from '../_services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[];
  product: Product;
  pagination: Pagination;
  productParams: ProductParams;
  pageNumber = 1;
  pageSize = 5;

  constructor(private productsService:ProductsService,private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts(this.pageNumber,this.pageSize).subscribe(response => {
      this.products = response.result;
      this.pagination = response.pagination;
    })
  }


}