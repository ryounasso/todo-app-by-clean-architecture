import { TodoRepository } from '../interfaceAdapters/repositories/todo.repository';
import { TodoService } from './todo.service';
import { Inject, Injectable } from '@nestjs/common';
import { TodoDto } from './todo.dto';
import { AddTodoDto } from './addTodo.dto';
import { TodoFactory } from './todo.factory';
import { StartDto } from './start.dto';
import { DoneDto } from './done.dto';
import { TodoListDto } from './todoList.dto';
import { TodoTitleDto } from './todoTitle.dto';

@Injectable()
export class TodoServiceImpl implements TodoService {
  constructor(
    @Inject('TodoRepository') private readonly todoRepository: TodoRepository,
    @Inject('UsecaseTodoFactory') private readonly todoFactory: TodoFactory,
  ) {}

  async getTodoList(
    userId: number,
    fields?: string[],
    exclude_done_todo?: boolean,
  ): Promise<TodoListDto> {
    let todoList;

    if (exclude_done_todo) {
      todoList = await this.todoRepository.findTodoListExcludeDone(userId);
    } else {
      todoList = await this.todoRepository.findTodoList(userId);
    }

    if (fields && fields.length > 0) {
      const items = todoList.map((todo) => {
        return new TodoListDto.Item(
          fields.includes('id') ? todo.getId() : undefined,
          fields.includes('title') ? todo.getTitle() : undefined,
          fields.includes('status') ? todo.getStatus() : undefined,
          fields.includes('userId') ? todo.getUserId() : undefined,
          fields.includes('createdAt') ? todo.getCreatedAt() : undefined,
          fields.includes('finishedAt') ? todo.getFinishedAt() : undefined,
        );
      });
      return new TodoListDto(items);
    }

    const items = todoList.map((todo) => {
      return new TodoListDto.Item(
        todo.getId(),
        todo.getTitle(),
        todo.getStatus(),
        todo.getUserId(),
        todo.getCreatedAt(),
        todo.getFinishedAt(),
      );
    });

    return new TodoListDto(items);
  }

  async addTodo(addTodoDto: AddTodoDto): Promise<TodoDto> {
    const todo = await this.todoRepository.insert(
      this.todoFactory.convertToAddTodoDto(addTodoDto),
    );
    return new TodoDto(
      todo.getId(),
      todo.getTitle(),
      todo.getUserId(),
      todo.getStatus(),
      todo.getCreatedAt(),
      todo.getFinishedAt(),
    );
  }

  async updateTitle(id: number, newTitle: string): Promise<TodoTitleDto> {
    const todo = await this.todoRepository.findById(id);
    todo.updateTitle(newTitle);

    const updatedTodo = await this.todoRepository.update(todo);

    return new TodoTitleDto(updatedTodo.getId(), updatedTodo.getTitle());
  }

  async start(id: number): Promise<StartDto> {
    const todo = await this.todoRepository.findById(id);
    todo.start();

    const updatedTodo = await this.todoRepository.update(todo);
    return new StartDto(updatedTodo.getId(), updatedTodo.getStatus());
  }

  async done(id: number): Promise<DoneDto> {
    const todo = await this.todoRepository.findById(id);
    todo.done();

    const updatedTodo = await this.todoRepository.update(todo);
    return new DoneDto(updatedTodo.getId(), updatedTodo.getStatus());
  }
}
