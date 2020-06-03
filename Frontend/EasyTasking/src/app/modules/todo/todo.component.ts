import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../utils/custom-validators';
import {TodoService} from "../../service/todo/todo.service";
import {AuthService} from "../../service/auth.service";
import { ServerService } from 'src/app/service/server.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  title = 'All';
  isAddingTask = false;
  // todoList = [
  //   {
  //   taskId: '78asd6as4d66',
  //   task: 'Create Dash board',
  //   stage: 'PENDING',
  //   label: 'WORK',
  //   dueDate: Date.now(),
  //   createdAt: Date.now(),
  //   updatedAt: Date.now()
  // }, {
  //   taskId: '78asd6as4d66',
  //   task: 'Create board',
  //   stage: 'PENDING',
  //   label: 'Personal',
  //   dueDate: Date.now(),
  //   createdAt: Date.now(),
  //   updatedAt: Date.now()
  // }];
  todoList=[];
  isNewTask = false;
  isEdit = false;

  editData: any = {};


  // Mobile selection
  filter = 'All';
  Category = 'Category';

  // Sample data delete once API are Implemented

  constructor(private todoService: TodoService,private authService:AuthService,private utils:ServerService) {
    
    // this.authService.initSession();
  }

  newTaskForm = new FormGroup({
    taskName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    taskDeadline: new FormControl('', Validators.required),
    taskLabel: new FormControl('', Validators.required),
    taskPriority: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    console.log("Dashboard :",this.authService.CurrentUser)
    // this.todoService.fetchTodoList()
    
    this.todoService.fetchTodoList().subscribe((response:any)=>{
      if(response.success){
        for(let i=0;i<response.data.length;i++){
          this.todoList.push(response.data[i])
        }
        console.log(this.todoList)
      }
    })
  }

  get addTaskForm() {
    return this.newTaskForm.controls;
  }

  resetAddTaskForm() {
    this.isNewTask = false
    this.isAddingTask = false
  }

  menu(data, i, filter): void {
    if (filter === 'edit') {
      this.editData = data;
      this.editData.originalIndex = i;
      const date = new Date(this.editData.dueDate);
      this.editData.dueDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
      console.log(this.editData);
      this.isEdit = true;
    }
    if (filter === 'inProgress') {
      // set stage to InProgress
    }
    if (filter === 'complete') {
      // set stage to COMPLETE
    }
    if (filter === 'delete') {
      this.deleteTask(data.id)
    }
  }

  editTask() {
    console.log(new Date(this.editData.dueDate));
    console.log(this.editData);
  }

  filterSelect(filter) {
    this.filter = filter;

    // Perform filter
  }


  categorySelect(category) {
    this.Category = category;

    // Arrange category
  }

  updateTodoArr(task){
    this.todoList.push(task);
  }

  addNewTask() {
    this.isAddingTask = true;
    console.log('works')
    if (this.newTaskForm.valid) {
      this.todoService.addTask({...this.newTaskForm.value}).subscribe((response: any) => {
        console.log(response)
        if (response.success) {
          this.updateTodoArr(response.data);
          this.utils.successMessage("Task added to list !")
        }else{
          this.utils.errorMessage("Failed to add task !")
        }
      },(error)=>{
        this.utils.errorMessage("Error occurred while adding task !")
      })
    }
  }

  deleteTask(taskId){
    this.todoService.deleteTask(taskId).subscribe((response:any) =>{
      if(response.success){
        let index= this.todoList.findIndex(e=>e.id.toString()==taskId.toString());
      }else{
        this.utils.errorMessage("Failed to delete task !")
      }
    },(error)=>{
        this.utils.errorMessage("Error occurred while deleting task !")
    })
  }

  

}
