import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  title = "All";

  todoList = [{
    taskId: "78asd6as4d66",
    task: "Create Dash board",
    stage: "PENDING",
    label: "WORK",
    dueDate: Date.now(),
    createdAt: Date.now(),
    updatedAt: Date.now()
  }, {
    taskId: "78asd6as4d66",
    task: "Create board",
    stage: "PENDING",
    label: "Personal",
    dueDate: Date.now(),
    createdAt: Date.now(),
    updatedAt: Date.now()
  }];

  isNewTask = false;
  isEdit = false;

  editData: any = {};


  // Mobile selection
  filter = 'All'
  Category = 'Category'

  // Sample data delete once API are Implemented
  sampleSelect = 'PERSONAL';

  constructor() { }

  ngOnInit(): void {
    // this.todoModifier(this.todoList)
  }

  menu(data, i, filter): void {
    if (filter == 'edit') {
      this.editData = data;
      this.editData['originalIndex'] = i;
      let date = new Date(this.editData.dueDate);
      this.editData.dueDate = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
      console.log(this.editData);
      this.isEdit = true;
    }
    if (filter == 'inProgress') {
      // set stage to InProgress
    }
    if (filter == 'complete') {
      // set stage to COMPLETE
    }
    if (filter == 'delete') {
      // Delete API
    }
  }

  editTask() {
    console.log(new Date(this.editData.dueDate))
    console.log(this.editData)
  }

  filterSelect(filter) {
    this.filter = filter;

    // Perform filter
  }


  categorySelect(category) {
    this.Category = category;

    // Arrange category
  }

}
