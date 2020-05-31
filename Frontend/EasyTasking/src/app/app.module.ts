import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';   // use this
import { HttpRequestInterceptor } from './service/interceptors/http-request-interceptor';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [            
    // Http Interceptor(s) -  adds with Client Credentials
    [
        { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
    ],
],
  bootstrap: [AppComponent]
})
export class AppModule { }
