import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';



import {Todo} from '../../utils/custom-types/todo/todo';

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  constructor(private http: HttpClient) { }

  public getTodoList(): Todo[]{

  }
}
