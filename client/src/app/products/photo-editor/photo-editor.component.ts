import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { Toast, ToastrService } from 'ngx-toastr';
import { Photo } from 'src/app/_models/photo';
import { Product } from 'src/app/_models/product';
import { ProductsService } from 'src/app/_services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  product: any;
  photo: Photo;

  constructor(private productService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProduct();
    this.initializeUploader(+this.route.snapshot.paramMap.get('id'));
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  initializeUploader(id: number) {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'products/'+ id +'/addphoto',
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response) {
        const photo = JSON.parse(response);
        this.product.photos.push(photo);
      }
    }
  }
  
  loadProduct() {
    this.productService.getProduct(+this.route.snapshot.paramMap.get('id')).subscribe(product => {
      this.product = product;
    })
  }

  setMainPhoto(photo: Photo) {
    this.productService.setMainPhoto(this.product.id,photo.id).subscribe(() =>{
      this.product.photoUrl = photo.url;
      this.product.photos.forEach(p => {
        if(p.isMain) p.isMain = false;
        if(p.id === photo.id) p.isMain = true;
      })
    })
  }

  deletePhoto(photoId: number) {
    this.productService.deletePhoto(this.product.id,photoId).subscribe(() =>{
      this.product.photos = this.product.photos.filter(x=> x.id !== photoId);
    })
  }

  


}
