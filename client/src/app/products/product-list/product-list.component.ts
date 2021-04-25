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

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getProducts(this.pageNumber,this.pageSize).subscribe(response =>{
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

}
