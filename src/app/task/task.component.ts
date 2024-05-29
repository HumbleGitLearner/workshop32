import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { atLeastFiveChars } from '../custom-validators';
import { Todo } from '../models/todo';

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
  currentTodo!: Todo;
  @Output() onSubmit= new Subject<Todo>();
  editMode:boolean=false;
  
  constructor(private fb: FormBuilder){
  }

  ngOnInit(): void {
    this.form= this.fb.group({
     // task: this.fb.control<string>('', [Validators.required, Validators.minLength(5)]),
     // task:['', [Validators.required, atLeastFiveChars]],
    task:['', [Validators.required, Validators.minLength(5), atLeastFiveChars]],
    priority:['Low',Validators.required], 
     // due:['', Validators.required]//check in the future
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.form.get('task')?.setValue(this.currentTodo.task);  
    this.form.get('priority')?.setValue(this.currentTodo.priority);
    this.editMode = true;
  }

  addTodo(){
    if (this.form.valid){
      console.log('Add todo');
      //const newItem: Todo= this.form.value;
      let desc = this.form.get('task')?.value;
      let priority = this.form.get('priority')?.value;
      let taskId = uuidv4();
      console.log("Task Id: ", taskId)
      console.log("Task Name: ", desc)
      console.log('Task priority: ', priority)
      this.currentTodo = new Todo(desc, priority, new Date(), taskId)
      this.onSubmit.next(this.currentTodo);
    } else {
      console.log('Form is invalid')
    }
  }

}
