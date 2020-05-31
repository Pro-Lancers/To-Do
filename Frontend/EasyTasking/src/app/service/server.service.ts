import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';

interface User {
  name?: string;
  email: string;
  password: string;
  gender?: string;
  phone?: string;
}
@Injectable({
  providedIn: 'root'
})


export class ServerService {

  // tslint:disable-next-line:variable-name
  private readonly _baseApiUrl = environment.baseUrl + '/api/v1/';

  private Alert = new Subject<any>();

  constructor(private http: HttpClient) {
  }
  errorMessage(message: string) {
    this.Alert.next({ message: message, type: 'error' });
  }

  successMessage(message) {
    this.Alert.next({ message: message, type: 'success' });
  }

  warnMessage(message) {
    this.Alert.next({ message: message, type: 'warn' });
  }

  getAlert(): Observable<any> {
    return this.Alert.asObservable();
  }

  registerUser(user: User) {
    !user['phone']?delete user['phone']:''
    return this.http.post<User>(this._baseApiUrl + 'users', user);
  }

  loginUser(user:User) {
    return this.http.post<User>(this._baseApiUrl + 'users/login',user);
  }
  
}
