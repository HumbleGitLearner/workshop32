import { Component } from '@angular/core';
import { Todo } from './models/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'workshop32';
  itemList: Todo[]=[];
  editElemIdx: number=0;

  itemSubmit(item:Todo){
    console.log('Item submitted: ', item)
    this.itemList.push(item)
  }

  itemEdit(item: Todo){
    console.log(item.taskId);
    this.editElemIdx = this.itemList.indexOf(item);
    console.log(this.editElemIdx)
    console.log(item.priority)
  }
    
}
