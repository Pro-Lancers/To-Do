import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

import {Todo} from '../../utils/custom-types/todo/todo';

import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  private readonly _baseApiUrl = environment.baseApiUrl + 'users/';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public fetchTodoList() {
    return this.http.get<Todo[]>(this._baseApiUrl + this.authService.CurrentUser.id + '/todos');
  }

  public addTask(task) {
    const newTask = {
      todoItem: task.taskName,
      dueDate: task.taskDeadline,
      label: task.taskLabel,
      priority: task.taskPriority,
      stage: 'PENDING'
    };
    return this.http.post<Todo>(this._baseApiUrl + this.authService.CurrentUser.id + '/todos', newTask);
  }

  public editTask(task) {
    const updatedTask = {
      todoItem: task.taskName,
      dueDate: task.taskDeadline,
      label: task.taskLabel,
      priority: task.taskPriority,
      stage: task.taskStage
    };
    return this.http.put<Todo>(this._baseApiUrl + this.authService.CurrentUser.id + '/todos/' + task.taskId, updatedTask);
  }

  public deleteTask(taskId) {
    return this.http.delete<Todo>(this._baseApiUrl + this.authService.CurrentUser.id + '/todos/' + taskId);
  }

}
