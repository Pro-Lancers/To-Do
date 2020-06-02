import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {CookieService} from './cookie.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
// @ts-ignore
import {User} from '../utils/custom-types/user/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  CurrentUser: any = {};

  // tslint:disable-next-line:variable-name
  private readonly _baseApiUrl = environment.baseApiUrl;

  constructor(public jwtHelper: JwtHelperService, private cookieService: CookieService, private http: HttpClient) {
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
  }
}
