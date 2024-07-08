import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ITodo } from '../models/itodo';

const todos: ITodo[] = [
  {
    id: 1,
    title: 'Learn Angular',
    content: 'Try to learn as fast as possible',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Get Coffee',
    content: 'Have a cuppa tea in morning',
    isComplete: true,
  },
  {
    id: 3,
    title: 'Build Project',
    content: 'Make a todo app',
    isComplete: false,
  },
];

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public todoListSubject = new BehaviorSubject<ITodo[]>(todos);

  constructor() {}

  getTodos(): Observable<ITodo[]> {
    return this.todoListSubject.asObservable();
  }

  createTodo(newTodo: ITodo): void {
    this.todoListSubject.next([...todos, newTodo]);
  }

  updateTodoStatus(id: number, isComplete: boolean) {
    const updatedTodos = this.todoListSubject.value.map((todo) =>
      todo.id === id ? { ...todo, isComplete } : todo
    );

    this.todoListSubject.next(updatedTodos);
  }
}
