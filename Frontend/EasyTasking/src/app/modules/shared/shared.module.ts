import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts/alerts.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    AlertsComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertsComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
