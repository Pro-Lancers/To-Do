import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from '../cookie.service';

/** Inject With Credentials into the request */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(private router: Router, private cookieService: CookieService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        // console.log("interceptor: " + req.url);
        req = req.clone({ headers: req.headers.set('Token', this.cookieService.getCookie('auth_token')) });

        return next.handle(req).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                if (event.status === 403 || event.status === 401) {
                    this.router.navigate(['/authencticate/login']);
                }
            }
            return event;
        }));
    }
}