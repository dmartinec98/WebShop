import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public isMenuCollapsed = true;
  collapsed = true;
  model: any = {};


  constructor(public accountService: AccountService,private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('');
      localStorage.setItem('userid', JSON.stringify(this.accountService.getUserId()));
    })    
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/shop');
    localStorage.removeItem('userid');
  }

}
