import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // const token = localStorage.getItem('auth_token');
    // const headers = new HttpHeaders().set('Authorization', token);

    const AuthRequest: any = request.clone({ withCredentials:true });

    return next.handle(AuthRequest).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        if (event.status === 403 || event.status === 401) {
          this.router.navigate(['/authencticate/login']);
        }
      }
      return event;
    }));
  }
}