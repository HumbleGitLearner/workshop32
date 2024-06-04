import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Todo } from '../models/todo';
import { atLeastFiveChars, lessThanToday } from '../utils/custom-validators';
import { formatDate } from '../utils/utilities';

import { Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit, OnChanges{

  form!: FormGroup;
  priorities: string[]=['Low', 'Medium', 'High']
  @Input()
  currentTodo: Todo=new Todo('', 'Low', new Date(), '', false);
  @Input()
  editMode: boolean = false;
  @Output() 
  onSubmit= new Subject<Todo>();
  @Output() 
  onEdit= new Subject<Todo>();
  @Output() 
  onDelete= new Subject<Todo>();
  @Output() 
  onCancelUpdate= new Subject<Todo>();

 
  constructor(private fb: FormBuilder){
    this.form= this.fb.group({
      // task: this.fb.control<string>('', [Validators.required, Validators.minLength(5)]),
      // task:['', [Validators.required, atLeastFiveChars]],
     task:['', [Validators.required, Validators.minLength(5), atLeastFiveChars]],
     priority:['Low',Validators.required], 
     due:[new Date(), [Validators.required, lessThanToday]],
     completed:[false] //removed this validators
    });
    console.log('task.component:::Exit--constructor---constructor---constructor---constructor---') 
  }
  
  ngOnInit(): void {
    console.log('task.component---Init---Init---Init---Init---Init---Init---Init')
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('task.component:::Enter--ngOnChanges---ngOnChanges---ngOnChanges---ngOnChanges---')
    if (this.editMode && this.form){
      console.log('ngOnChanges: ', this.currentTodo.task)
      console.log('ngOnChanges: ', this.currentTodo.priority)
      console.log('ngOnChanges: ', this.currentTodo.dueDate)
      console.log('ngOnChanges: ', this.currentTodo.completed)
      console.log('ngOnChanges: ', this.currentTodo.taskId)
      // console.log('ngOnChanges: ',changes['currentTodo'].currentValue.task);
      // console.log('ngOnChanges: ',changes['currentTodo'].currentValue.priority);
      this.form.get("task")?.setValue(this.currentTodo.task);
      //this.form.get('task')?.setValue(changes['currentTodo'].currentValue.task);  
      this.form.get("priority")?.setValue(changes['currentTodo'].currentValue.priority);
      this.form.get("due")?.setValue(this.currentTodo.dueDate);
      this.form.get("completed")?.setValue(this.currentTodo.completed);  
    } //skipping after the item has been chanaged, ediMode=false
  }

  addTodo(){
    if (this.form.valid){
      //const formData = this.myForm.value;
      console.log('Add todo'); 
      let desc = this.form.get('task')?.value;
      let priority = this.form.get('priority')?.value;
      let dueDate = formatDate(this.form.get('due')?.value);
      let taskId = uuidv4();
      console.log("Task Id: ", taskId);
      console.log("Task Name: ", desc);
      console.log('Task priority: ', priority);
      this.onSubmit.next( new Todo(desc, priority, new Date(dueDate), taskId, false));//completed = false
    } else {
      console.log('Form is invalid');
    }
    setTimeout(() => {
      this.form.reset();
      this.editMode = false;
    }, 500); // Adjust the timeout duration as needed to ensure tasks are completed
  }

  updateTodo(){
    if (this.form.valid){
      const updateItem : Todo= new Todo(this.form.get('task')?.value,
                                this.form.get('priority')?.value,
                                new Date(formatDate(this.form.get('due')?.value)),
                                this.currentTodo.taskId,
                                this.form.get('completed')?.value);
    //  console.log("UpdateTodo: ", newItem.toString());
      console.log("UpdateTodo: ", updateItem);
      this.onEdit.next( updateItem);
    } else {
      console.log('Form is invalid');
    }
    setTimeout(() => {
      this.form.reset();
      this.editMode = false;
    //  this.currentTodo.task ='';
      this.currentTodo = new Todo('', 'Low', new Date(), '', false);
    }, 500); // Adjust the timeout duration as needed to ensure tasks are completed

   }

  deleteTodo(){
    console.log("app-task.deleteTodo: ", this.form.get('task')?.value);
    this.onDelete.next(this.currentTodo);
    setTimeout(() => {
      this.form.reset();
      this.editMode = false;
      this.currentTodo = new Todo('', 'Low', new Date(), '', false);
    }, 500)
  }

  cancelUpdateTodo(){
    console.log("app-task.cancelUpdateTodo: ", this.form.get('task')?.value);
    this.onCancelUpdate.next(this.currentTodo);
    setTimeout(() => {
      this.form.reset();
      this.editMode = false;
      this.currentTodo = new Todo('', 'Low', new Date(), '', false);
    }, 500)
  }
}
