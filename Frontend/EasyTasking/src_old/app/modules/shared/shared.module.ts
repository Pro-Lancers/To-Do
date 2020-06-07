import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts/alerts.component';
import { HeaderComponent } from './header/header.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';



@NgModule({
  declarations: [
    AlertsComponent,
    HeaderComponent,
    LoadingScreenComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertsComponent,
    HeaderComponent,
    LoadingScreenComponent
  ]
})
export class SharedModule { }
