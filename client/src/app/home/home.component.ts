import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any;

  constructor(public accountService:AccountService, private http: HttpClient, private toastr: ToastrService ) { }

  ngOnInit(): void {
  }

  getProducts() {
    this.http.get('https://localhost:5001/api/products').subscribe(resposne => {
      this.products = resposne;
    }, error => {
      this.toastr.error(error.error);
    });
  }


}