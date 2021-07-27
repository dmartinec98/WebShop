import { forEach } from '@angular-devkit/schematics';
import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/_models/pagination';
import { Product } from 'src/app/_models/product';
import { ProductParams } from 'src/app/_models/productParams';
import { ProductsService } from 'src/app/_services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  pagination: Pagination;
  productParams: ProductParams;
  pageNumber = 1;
  pageSize = 5;
  sort = "";
  search: any = {};

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getProducts(this.pageNumber,this.pageSize, this.sort,this.search.search).subscribe(response =>{
      console.log(response.pagination);
      this.products = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event)
    {
      this.pageNumber = event;
      this.loadProducts();
    }
  }

  priceAsc() {
    this.sort = "priceAsc";
    this.loadProducts();
  }

  priceDesc() {
    this.sort = "priceDesc";
    this.loadProducts();
  }

  nameAsc() {
    this.sort = "nameAsc";
    this.loadProducts();
  }

  nameDesc() {
    this.sort = "nameDesc";
    this.loadProducts();
  }

  resetParams() {
    this.sort = "";
    this.search.search = "";
    this.nadji();
  }

  nadji() {
    console.log(this.search.search);
    this.productsService.getProducts(this.pageNumber,this.pageSize, this.sort,this.search.search).subscribe(response =>{
      this.products = response.result;
      this.pagination = response.pagination;
    })
  }
}
