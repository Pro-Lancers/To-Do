import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';

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

  isLoading = false;
  private Alert = new Subject<any>();

  constructor() {
  }

  errorMessage(message: string) {
    this.Alert.next({message, type: 'error'});
  }

  successMessage(message) {
    this.Alert.next({message, type: 'success'});
  }

  warnMessage(message) {
    this.Alert.next({message, type: 'warn'});
  }

  getAlert(): Observable<any> {
    return this.Alert.asObservable();
  }

}
