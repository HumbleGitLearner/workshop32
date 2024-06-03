import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../models/todo';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  @Input()
  list: Todo[]=[]; 
  @Output()
  editTodo = new EventEmitter<Todo>();


  toggleComplete(t: Todo){

  }

  edit(t:Todo){
    console.log("Task-list: ", t);
    this.editTodo.emit(t);
  }

}
