import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {CookieService} from './cookie.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

interface User {
  name?: string;
  email: string;
  password: string;
  gender?: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  CurrentUser: any = {};

  // tslint:disable-next-line:variable-name
  private readonly _baseApiUrl = environment.baseUrl + '/api/v1/';

  constructor(public jwtHelper: JwtHelperService, private cookieService: CookieService, private http: HttpClient) {
  }

  private getUserId() {
    const token = this.cookieService.getCookie('auth_token');
    const {id} = this.jwtHelper.decodeToken(token);
    return id;
  }

  private initUserInfo(userId) {
    return this.http.get<User>(this._baseApiUrl + 'users/' + userId).subscribe(
      (response: any) => {
                if (response.success) {
                  this.CurrentUser = response.data;
                }
            },
      (error) => {
                console.log('Some error occurred !');
            });
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

  public setUserInfo() {
    const id = this.getUserId();
    this.initUserInfo(id);
  }
}
