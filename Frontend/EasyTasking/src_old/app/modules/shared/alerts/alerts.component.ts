import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServerService } from 'src/app/service/server.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  alert = false;
  alertObject = [];
  messages: any[] = [];

  subscription: Subscription;

  constructor(private el: ElementRef, private render: Renderer2, private server: ServerService) {
    this.subscription = this.server.getAlert().subscribe(object => {
      this.addData(object.type, object.message);
    });
  }

  ngOnInit(): void {
  }

  addData(type, message) {
    const data = {
      type: type,
      message: message,
    }
    this.alertObject.push(data);
    this.popOut();
  }

  popOut() {
    setTimeout(() => {
      const alert = this.el.nativeElement.getElementsByClassName('alertBox')[0];
      this.render.addClass(alert, 'alertBoxHider');
      setTimeout(() => {
        this.alertObject.splice(0, 1);
      }, 800);
    }, 2000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
