import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  readonly api = environment.api + '/api/v1';

  constructor(private http: HttpClient) { }
}
