import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';

interface User {
  name: string;
  email: string;
  password: string;
  phone: string;
}
@Injectable({
  providedIn: 'root'
})


export class ServerService {

  // tslint:disable-next-line:variable-name
  private readonly _baseApiUrl = environment.baseUrl + '/api/v1';

  constructor(private http: HttpClient) {
  }

  registerUser(user: User) {
    return this.http.post<User>(this._baseApiUrl + 'users', JSON.stringify(user));
  }
}
