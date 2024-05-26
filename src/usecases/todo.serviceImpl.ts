import { TodoRepository } from '../interfaceAdapters/repositories/todo.repository';
import { TodoService } from './todo.service';
import { Inject, Injectable } from '@nestjs/common';
import { TodoDto } from './todo.dto';
import { AddTodoDto } from './addTodo.dto';
import { TodoDxo } from './todo.dxo';
import { UpdateTodoDto } from './update.todo.dto';
import { StartDto } from './start.dto';
import { DoneDto } from './done.dto';
import { Todo } from '../entities/todo';

@Injectable()
export class TodoServiceImpl implements TodoService {
  constructor(
    @Inject('TodoRepository') private readonly todoRepository: TodoRepository,
    @Inject('UsecaseTodoDxo') private readonly todoDxo: TodoDxo,
  ) {}

  async getTodoList(
    userId: number,
    fields: (keyof Todo)[],
    exclude_done_todo?: boolean,
  ): Promise<TodoDto[]> {
    let todoList;
    if (exclude_done_todo) {
      todoList = await this.todoRepository.findTodoListExcludeDone(userId);
    } else {
      todoList = await this.todoRepository.findTodoList(userId);
    }

    if (fields.length > 0) {
      if (exclude_done_todo) {
        todoList =
          await this.todoRepository.findTodobySpecifiedFieldsAndExcludeDoneTodo(
            userId,
            fields,
          );
      } else {
        todoList = await this.todoRepository.findTodoListbySpecifiedFields(
          userId,
          fields,
        );
      }
    }

    return todoList.map((todo) => {
      return new TodoDto(
        todo.getId(),
        todo.getTitle(),
        todo.getUserId(),
        todo.getStatus(),
        todo.getCreatedAt(),
      );
    });
  }

  async addTodo(addTodoDto: AddTodoDto): Promise<TodoDto> {
    const todo = await this.todoRepository.insert(
      this.todoDxo.convertToAddTodoDto(addTodoDto),
    );
    return new TodoDto(
      todo.getId(),
      todo.getTitle(),
      todo.getUserId(),
      todo.getStatus(),
      todo.getCreatedAt(),
    );
  }

  async setTodo(updateTodoDto: UpdateTodoDto): Promise<TodoDto> {
    const todo = await this.todoRepository.update(
      this.todoDxo.convertToUpdateTodoDto(
        new UpdateTodoDto(updateTodoDto.getId(), updateTodoDto.getTitle()),
      ),
    );

    return new TodoDto(
      todo.getId(),
      todo.getTitle(),
      todo.getUserId(),
      todo.getStatus(),
      todo.getCreatedAt(),
    );
  }

  async startTodo(id: number): Promise<StartDto> {
    // optional
    const todo = await this.todoRepository.findById(id);
    todo.start();

    const updatedTodo = await this.todoRepository.update(
      new UpdateTodoDto(todo.getId(), todo.getTitle(), todo.getStatus()),
    );
    return new StartDto(updatedTodo.getId(), updatedTodo.getStatus());
  }

  async done(id: number): Promise<DoneDto> {
    const todo = await this.todoRepository.update(
      new UpdateTodoDto(id, undefined, 'done', new Date()),
    );
    return new DoneDto(todo.getId(), todo.getStatus());
  }
}
