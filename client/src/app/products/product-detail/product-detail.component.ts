import { json } from '@angular-devkit/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Komentar } from 'src/app/_models/komentar';
import { Ocijena } from 'src/app/_models/ocijena';
import { Order } from 'src/app/_models/order';
import { Product } from 'src/app/_models/product';
import { AccountService } from 'src/app/_services/account.service';
import { CommentService } from 'src/app/_services/comment.service';
import { ProductsService } from 'src/app/_services/products.service';
import { RatingService } from 'src/app/_services/rating.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  currentRate;
  order: Order;
  ocijena: Ocijena[];
  grade: Ocijena;
  prosjek: any;
  pomoc: any;
  suma: any;
  tvojRating: any;
  model: any = {};
  komentar: Komentar;
  komentari: Komentar[];
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  readonly = true;

  constructor(private productService: ProductsService, private route: ActivatedRoute, private toast: ToastrService,
                private commentService: CommentService, private ratingService: RatingService, public accountService:AccountService,
                  config: NgbRatingConfig) {
                    config.max = 10;                    
                  }

  ngOnInit(): void {
    this.loadProduct();
    this.showComment();
    this.getRating();
    this.getProvjeraKorisnika();

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
    var cart = JSON.parse(sessionStorage.getItem("cart"));
    if(cart == null) cart = [];
    cart.push(this.product);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    this.toast.success("Proizvod dodan na listu želja");
  }

  showComment() {
    this.commentService.getComment(+this.route.snapshot.paramMap.get('id')).subscribe(response =>{
      this.komentari = response;
    })
  }

  addComment() {
    this.komentar = {};
    this.komentar.Komentar = this.model.komentar;
    this.komentar.ProductId = +this.route.snapshot.paramMap.get('id');  
    this.pomoc = JSON.parse(localStorage.getItem('user'));
    this.komentar.Username = this.pomoc.username;
    this.commentService.addComment(this.komentar).subscribe(response =>{
    });
    window.location.reload();
  }

  getRating() {
    this.ratingService.getRating(+this.route.snapshot.paramMap.get('id')).subscribe(ocijena =>{
      this.ocijena = ocijena;
      var pomoc = 0;
      this.ocijena.forEach(element => {
        pomoc += element.rating;
      });
      this.prosjek = pomoc/this.ocijena.length    
    })
  }

  getProvjeraKorisnika() {
    var sumaa = 0;
    var pomoc:number = JSON.parse(localStorage.getItem('userid'));
    this.ratingService.getRating(+this.route.snapshot.paramMap.get('id')).subscribe(ocijena =>{
      this.ocijena = ocijena;
      this.ocijena.forEach(element => {
        if(pomoc == element.userId) sumaa += element.rating;
      }); 
      this.suma = sumaa; 
    })
    console.log(this.suma);
  }

  ocjeniProizvod() {
    this.grade = {};
    this.grade.productId = +this.route.snapshot.paramMap.get('id');
    this.grade.rating = this.currentRate;
    this.grade.userId = JSON.parse(localStorage.getItem('userid'));
    this.ratingService.addRating(this.grade).subscribe(()=>{});
    window.location.reload();
  }


}