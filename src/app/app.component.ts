import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ITodo } from './shared/models/itodo';
import { TodoService } from './shared/services/todo.service';
import { IdService } from './shared/services/id.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  completedTodos: ITodo[];
  inProgressTodos: ITodo[];

  constructor(private todoService: TodoService, private idService: IdService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.completedTodos = todos.filter((todo) => todo.isComplete);
      this.inProgressTodos = todos.filter((todo) => !todo.isComplete);
    });
  }

  newTodo = new FormGroup({
    title: new FormControl<string>(''),
    content: new FormControl<string>(''),
    isComplete: new FormControl<boolean>(false),
  });

  addTodo() {
    const todo: ITodo = {
      id: this.idService.getNextId(),
      title: this.newTodo.controls.title.value!,
      content: this.newTodo.controls.content.value!,
      isComplete: false,
    };

    this.todoService.createTodo(todo);
    this.newTodo.reset();
  }

  toggleComplete(todo: ITodo) {
    const updatedStatus = !todo.isComplete;
    this.todoService.updateTodoStatus(todo.id, updatedStatus);
  }
}
