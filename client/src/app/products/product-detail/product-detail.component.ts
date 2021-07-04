import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/_models/product';
import { ProductsService } from 'src/app/_services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private productService: ProductsService, private route: ActivatedRoute, private toast: ToastrService) { }

  ngOnInit(): void {
    this.loadProduct();

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]   
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls=[];
    for (const photo of this.product.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrls;
  }

  loadProduct() {
    this.productService.getProduct(+this.route.snapshot.paramMap.get('id')).subscribe(product => {
      this.product = product;
      this.galleryImages = this.getImages();
    })
  }

  addtocart() {
    this.loadProduct();
    var chart = JSON.parse(sessionStorage.getItem("cart"));
    if(chart == null) chart = [];
    chart.push(this.product);
    sessionStorage.setItem('cart', JSON.stringify(chart));
    this.toast.success("Proizvod dodan na listu želja");
  }
}