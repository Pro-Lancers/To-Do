import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/service/server.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit {

  constructor(public server: ServerService) { }

  ngOnInit(): void {
  }

}
