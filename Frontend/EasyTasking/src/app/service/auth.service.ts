import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from './cookie.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
// @ts-ignore
import { User } from '../utils/custom-types/user/user';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public CurrentUser: any = {};

  // tslint:disable-next-line:variable-name
  private readonly _baseApiUrl = environment.baseUrl + '/api/v1/';

  constructor(private router: Router, public jwtHelper: JwtHelperService, private cookieService: CookieService, private http: HttpClient) {
    if (this.isAuthenticated()) {
      this.initSession();
    }
  }

  public decodeToken() {
    const token = this.cookieService.getCookie('auth_token');
    const payload = this.jwtHelper.decodeToken(token);
    return payload;
  }

  public fetchUserInfo(userId) {
    return this.http.get<User>(this._baseApiUrl + 'users/' + userId);
  }

  public isAuthenticated(): boolean {
    const token = this.cookieService.getCookie('auth_token');
    return token.length !== 0 || !this.jwtHelper.isTokenExpired(token);
  }

  public registerUser(user: User) {
    !user.phone ? delete user.phone : '';
    return this.http.post<User>(this._baseApiUrl + 'users', user);
  }

  public loginUser(user: User) {
    return this.http.post<User>(this._baseApiUrl + 'users/login', user);
  }

  public initUserInfo(obj) {
    this.CurrentUser = obj;
    localStorage.setItem('currentUser', JSON.stringify(obj))
  }

  public initSession() {
    const payload = this.decodeToken();
    this.fetchUserInfo(payload.id)
      .pipe(
        tap((res: any) => {
          if (res.success) {
            console.log('user :', res.data);
            this.initUserInfo(res.data);
          }
        }),
      )
      .subscribe(res => this.router.navigate(['/dashboard']));
  }
}
