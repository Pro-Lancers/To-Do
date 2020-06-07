import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../utils/custom-validators';
import { TodoService } from '../../service/todo/todo.service';
import { AuthService } from '../../service/auth.service';
import { ServerService } from 'src/app/service/server.service';

import { TodoLabel } from 'src/app/utils/custom-types/todo/todo-label';
import { TodoPriority } from 'src/app/utils/custom-types/todo/todo-priority';
import { TodoStage } from 'src/app/utils/custom-types/todo/todo-stage';
import { CookieService } from '../../service/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  TODO_LABELS = TodoLabel;
  TODO_PRIORITIES = TodoPriority;
  TODO_STAGES = TodoStage;


  title = 'All';
  isAddingTask = false;

  todoList = [];
  viewTodo = [];
  isNewTask = false;
  isEdit = false;
  isUpdatingTask = false;
  currentEditingTask: any = {};


  // Mobile selection
  filter = 'All';
  Category = 'Category';

  constructor(private todoService: TodoService, private authService: AuthService,
    private router: Router,
    private utils: ServerService, private cookieService: CookieService) {

  }

  newTaskFormGroup = new FormGroup({
    taskName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    taskDeadline: new FormControl('', Validators.required),
    taskLabel: new FormControl('', Validators.required),
    taskPriority: new FormControl('', Validators.required),
  });

  editTaskFormGroup = new FormGroup({
    taskName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    taskDeadline: new FormControl('', Validators.required),
    taskLabel: new FormControl('', Validators.required),
    taskStage: new FormControl('', Validators.required),
    taskPriority: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.utils.isLoading = true
      this.todoService.fetchTodoList().subscribe((response: any) => {
        if (response.success) {
          for (let i = 0; i < response.data.length; i++) {
            this.todoList.push(response.data[i]);
          }
          this.viewTodo = [...this.todoList];
          this.utils.isLoading = false
        } else {
          this.utils.isLoading = false;
        }
      });
    } else {
      this.router.navigate(['/authenticate/login'])
    }

  }

  get newTaskFormObj() {
    return this.newTaskFormGroup.controls;
  }

  get editTaskFormObj() {
    return this.editTaskFormGroup.controls;
  }

  resetForm() {
    this.isNewTask = false;
    this.isAddingTask = false;

    this.isEdit = false;
    this.isUpdatingTask = false;

    this.newTaskFormGroup.reset();
    this.editTaskFormGroup.reset();
  }

  menu(data, i, filter): void {
    if (filter === 'edit') {
      this.currentEditingTask = data;
      this.currentEditingTask.originalIndex = i;
      const date = new Date(this.currentEditingTask.dueDate);
      this.currentEditingTask.dueDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

      this.isEdit = true;
    }

    if (filter === 'delete') {
      this.deleteTask(data.id);
    }
  }

  filterSelect(filter) {
    this.filter = filter;
    if (filter === 'All') this.viewTodo = this.todoList;
    else this.viewTodo = this.todoList.filter(e => e.stage === filter);
    // Perform filter
  }

  categorySelect(category) {
    this.Category = category;
    console.log((category))
    this.viewTodo = this.todoList.filter(e => e.label === category);
    // Arrange category
  }


  updateTodoArray(operation, obj) {
    if (operation === 'push') {
      this.todoList.push(obj);
    } else if (operation === 'delete') {
      if (obj.index > -1) {
        this.todoList.splice(obj.index, 1);
      }
    } else if (operation === 'replace') {
      this.todoList[obj.index] = obj.data;
    }
    this.viewTodo = [...this.todoList];
  }

  resetEditForm() {
    this.currentEditingTask = {}
    this.isEdit = true
  }

  addNewTask() {
    this.isAddingTask = true;
    if (this.newTaskFormGroup.valid) {
      this.utils.isLoading = true;
      this.todoService.addTask({ ...this.newTaskFormGroup.value }).subscribe((response: any) => {
        if (response.success) {
          console.log('response :', response)
          this.updateTodoArray('push', { ...response.data });
          this.utils.isLoading = false;
          this.utils.successMessage('Task added to list !');
          this.resetForm();
        } else {
          this.utils.errorMessage('Failed to add task !');
          this.utils.isLoading = false;
        }
      }, (error) => {
        this.utils.errorMessage('Error occurred while adding task !');
        this.utils.isLoading = false;
      });
    }
  }

  editTask() {
    this.utils.isLoading = true;
    this.isUpdatingTask = true;
    if (this.editTaskFormGroup.valid) {
      const updatedTask = {
        ...this.editTaskFormGroup.value,
        taskId: this.currentEditingTask.id.toString(),
      };
      this.todoService.editTask(updatedTask).subscribe((response: any) => {
        if (response.success) {
          this.utils.isLoading = false;
          this.utils.successMessage('Task updated !');
          console.log("edit : ", response)
          this.updateTodoArray('replace', { index: this.currentEditingTask.originalIndex, data: response.data });
          this.resetForm();
        } else {
          this.utils.isLoading = false;
          this.utils.errorMessage('Failed to update task !');
        }
      }, (error) => {
        this.utils.isLoading = false;
        this.utils.errorMessage('Error occurred while updating task !');
      });
    }
  }

  deleteTask(taskId) {
    this.utils.isLoading = true;
    this.todoService.deleteTask(taskId).subscribe((response: any) => {
      if (response.success) {
        const index = this.todoList.findIndex(e => e.id.toString() == taskId.toString());
        this.updateTodoArray('delete', { index: index });
        this.utils.isLoading = false;
      } else {
        this.utils.errorMessage('Failed to delete task !');
        this.utils.isLoading = false;
      }
    }, (error) => {
      this.utils.errorMessage('Error occurred while deleting task !');
      this.utils.isLoading = false;
    });
  }
}
