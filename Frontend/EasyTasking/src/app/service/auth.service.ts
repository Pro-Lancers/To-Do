import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) {
  }

  public isAuthenticated(): boolean {
    const token = localStorage.get('auth_token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
