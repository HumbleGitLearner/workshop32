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
  editElemIdx: number=-1;
 
  addItem(item:Todo){
    console.log('AppComponent.addItem: ', item);
    this.itemList.push(item)
  }

  toEditItem(item: Todo){
    console.log('AppComponent.toEditItem: ',item.taskId);
    this.editElemIdx = this.itemList.indexOf(item);
    console.log(this.editElemIdx)
    console.log(item.priority)
  }

  updateItem(item:Todo){
    console.log('AppComponent.editItem: ', item);
    this.itemList[this.editElemIdx] = item;
  //  console.log(`Item of index ${this.editElemIdx} updated: ${item.toString()}`)
    console.log(`Item of index ${this.editElemIdx} updated: ${item}`)
    this.editElemIdx= -1;//in order to set editMode to false after updating
  }

  deleteItem(item: Todo){
    console.log('AppComponent.deleteItem: ',item.task);
   // this.itemList.splice(this.editElemIdx, 1)
    this.itemList.splice(this.itemList.indexOf(item), 1);
    console.log(`Item ${item.task} removed.`);
    console.log("size of the itemlist is now: ", this.itemList.length)
    this.editElemIdx= -1;//in order to set editMode to false after updating
    // let foo_object; // Itemitem(object here) to remove
    // this.foo_objects = this.foo_objects.filter(obj => return obj !== foo_object);
  }
   
  cancelUpdate(item: Todo):void{
    console.log('AppComponent.cancelUpdate: ',item.task);
    this.editElemIdx= -1;//in order to set editMode to false after updating
  }

}
