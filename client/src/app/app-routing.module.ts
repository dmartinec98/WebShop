import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { PhotoEditorComponent } from './products/photo-editor/photo-editor.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},  
  {path: 'product', component: ProductCardComponent},
  {path: 'product/:id',component: ProductDetailComponent},
  {path: 'shop' ,component: ProductListComponent},  
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: 'addnew', component: ProductAddComponent},
  {path: 'product/:id/editphoto', component: PhotoEditorComponent},
  {path:'**',component: NotFoundComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
