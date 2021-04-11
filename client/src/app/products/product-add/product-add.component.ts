import { Identifiers } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { env } from 'process';
import { last } from 'rxjs/operators';
import { Product } from 'src/app/_models/product';
import { ProductsService } from 'src/app/_services/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  model: any = {};
  product: any;

  constructor(private productsService: ProductsService,private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addProduct() {
    console.log(this.model);
    this.productsService.addProduct(this.model).subscribe(response => {
      this.product = response;
      this.router.navigateByUrl("product/" + this.product.id + "/editphoto");            
    });  
  }

}
