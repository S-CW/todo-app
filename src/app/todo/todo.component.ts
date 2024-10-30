import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ITodo } from '../shared/models/itodo';
import { IdService } from '../shared/services/id.service';
import { TodoService } from '../shared/services/todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, CdkDropList, CdkDrag, MatIconModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit {
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

  drop(event: CdkDragDrop<ITodo[]>) {
    const todo = event.item.data;
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const updatedStatus = !todo.isComplete;
      this.todoService.updateTodoStatus(todo.id, updatedStatus);
    }
  }
}
