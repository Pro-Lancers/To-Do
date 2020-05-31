import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/** Inject With Credentials into the request */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        // console.log("interceptor: " + req.url);
        req = req.clone({
            withCredentials: true
        });

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