import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Todo } from './todo.interface';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  private readonly logger = new Logger(TodoController.name);
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): Todo[] {
    this.logger.log('Handling findAll request');
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Todo {
    this.logger.log('Handling findOne request with id = ' + id);
    return this.todoService.findOne(id);
  }

  @Post()
  create(@Body() todo: Todo): Todo {
    this.logger.log('Handling create request');
    return this.todoService.create(todo);
  }

  @Put()
  update(@Body() todo: Todo): Todo {
    this.logger.log('Handling update request with id = ' + todo.id);
    return this.todoService.update(todo.id, todo);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): void {
    this.logger.log('Handling delete request with id = ' + id);
    return this.todoService.delete(id);
  }
}
