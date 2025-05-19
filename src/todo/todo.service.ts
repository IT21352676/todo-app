import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  private idCounter = 1;

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  create(todo: Omit<Todo, 'id'>): Todo {
    const newTodo = { id: this.idCounter++, ...todo };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: number, updatedData: Partial<Todo>): Todo {
    const todo = this.findOne(id);
    Object.assign(todo, updatedData);
    return todo;
  }

  remove(id: number): void {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) throw new NotFoundException('Todo not found');
    this.todos.splice(index, 1);
  }
}
