import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { OrdersComponent } from './orders/orders.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { PhotoEditorComponent } from './products/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { BasketComponent } from './basket/basket.component';
import { HasRoleDirective } from './_directives/has-role.directive';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    OrdersComponent,
    TestErrorsComponent,
    ServerErrorComponent,
    NotFoundComponent,
    ProductListComponent,
    ProductCardComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductAddComponent,
    PhotoEditorComponent,
    BasketComponent,
    HasRoleDirective
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgxGalleryModule,
    FileUploadModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
