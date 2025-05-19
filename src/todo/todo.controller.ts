import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Todo {
    return this.todoService.findOne(+id);
  }

  @Post()
  create(@Body() createTodo: Omit<Todo, 'id'>): Todo {
    return this.todoService.create(createTodo);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodo: Partial<Todo>): Todo {
    return this.todoService.update(+id, updateTodo);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.todoService.remove(+id);
  }
}
