import { Todo } from './../../models/Todo';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todosService: TodoService) { }

  ngOnInit(): void {
  }

  // set Dynamic classes

  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }

    return classes;
  }

  // On Toggle method

  onToggle(todo) {

    // Toggle in UI
    todo.completed = !todo.completed;
    // Toggle on server
    this.todosService.toggleCompleted(todo).subscribe(todo => {
        console.log(todo);
    });

  }

  onDelete(todo) {
    this.deleteTodo.emit(todo);
  }

}
