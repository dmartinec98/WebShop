import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit { 
  model: any = {};

  constructor(private accountService:AccountService, private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register(){
    console.log(this.model);
    this.accountService.register(this.model).subscribe(response =>{
      this.router.navigateByUrl('/');
    },error =>{
      this.toastr.error(error.error);
    })
  }

}
