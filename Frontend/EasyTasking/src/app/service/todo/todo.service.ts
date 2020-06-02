import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


import {Todo} from '../../utils/custom-types/todo/todo';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  private readonly _baseApiUrl = environment.baseApiUrl + 'users/';

  TodoList: Todo[];

  constructor(private http: HttpClient, private authService: AuthService) {
    this.fetchTodoList();
  }

  public fetchTodoList() {
    return this.http.get<Todo[]>(this._baseApiUrl + this.authService.CurrentUser.id + '/todos');
  }

  public initTodoList(arr){
    this.TodoList = [...arr];
  }

  public getTodoList(){
     this.fetchTodoList();
  }
}
