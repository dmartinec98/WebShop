import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/_models/product';
import { ProductsService } from 'src/app/_services/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  model: any = {};
  product: Product;

  constructor(private productsService: ProductsService,private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }


  addProduct() {
    console.log(this.model);
    this.productsService.addProduct(this.model).subscribe(() => {
      this.toastr.success("Dodali ste proizvod");
    })
  }
}
