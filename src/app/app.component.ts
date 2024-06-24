import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ITodo } from './models/itodo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  todos: ITodo[] = [
    {
      title: 'Learn Angular',
      content: 'Try to learn as fast as possible',
      isComplete: false,
    },
    {
      title: 'Get Coffee',
      content: 'Have a cuppa tea in morning',
      isComplete: true,
    },
    {
      title: 'Build PC',
      content: 'Get a gaming rig',
      isComplete: false,
    },
  ];

  newTodo = new FormGroup({
    title: new FormControl<string>(''),
    content: new FormControl<string>(''),
    isComplete: new FormControl<boolean>(false),
  });

  addTodo() {
    const todo: ITodo = {
      title: this.newTodo.controls.title.value!,
      content: this.newTodo.controls.content.value!,
      isComplete: false,
    }

    this.todos.push(todo);
    console.log(this.newTodo.value);
  }
}
