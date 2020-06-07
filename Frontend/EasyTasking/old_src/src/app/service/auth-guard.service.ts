import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {CanActivate, Router, CanLoad} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {

  constructor(public authService: AuthService, public router: Router) {
  }

  canLoad(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/authenticate']);
      return false;
    }
    return true;
  }
}
