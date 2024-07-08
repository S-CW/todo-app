import { Injectable } from '@angular/core';
import { TodoService } from './todo.service';

@Injectable({
  providedIn: 'root',
})
export class IdService {
  private currentId = this.todoService.todoListSubject.value.length;
  constructor(private todoService: TodoService) {}

  getNextId() {
    return (this.currentId += 1);
  }
}
