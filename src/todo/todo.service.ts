import { Injectable } from '@nestjs/common';
import { Todo } from './todo.interface';

@Injectable()
export class TodoService {
  private storage: Todo[] = [];

  findAll(): Todo[] {
    return this.storage;
  }

  findOne(id: number): Todo {
    return this.storage.find((item: Todo) => item.id === id);
  }

  create(todo: Todo): Todo {
    const currentMaxId = Math.max(...this.storage.map((t: Todo) => t.id));
    todo.id = currentMaxId < 1 ? 1 : currentMaxId + 1;
    this.storage.push(todo);
    console.log(currentMaxId);
    return todo;
  }

  update(id: number, newTodo: Todo): Todo {
    const index = this.storage.findIndex((item: Todo) => item.id === id);
    this.storage[index] = { ...newTodo };
    return this.storage[index];
  }

  delete(id: number): void {
    this.storage = [...this.storage.filter((item: Todo) => item.id !== id)];
  }
}
