import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { CookieService } from "../../../service/cookie.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username = 'GUest';

  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) {
  }

  ngOnInit(): void {
    this.username = this.authService.getUserInfo().name;
  }

  logout() {
    localStorage.removeItem('_CurrentUser')
    this.cookieService.deleteCookie('auth_token')
    this.router.navigate(['/authenticate/login'])
  }

}
