import { Inject, Injectable } from '@nestjs/common';
import { mockInsertedTask, mockTask, mockTaskList } from '../drivers/mock/task';
import { TaskRepository } from './task.repository';
import { AddTodoDto } from './addTodo.dto';
import { TodoDto as UsecaseTodoDto } from '../usecases/todo.dto';
import { TodoDxo } from './todo.dxo';
import { TodoDto } from './todo.dto';

@Injectable()
export class TaskRepositoryImpl implements TaskRepository {
  constructor(@Inject('AdapterTodoDxo') private readonly todoDxo: TodoDxo) {}

  findById(id: number): UsecaseTodoDto {
    const task = mockTask(id);
    return this.todoDxo.convertToUsecaseTodoDto(
      new TodoDto(task.getId(), task.getTitle(), 1, task.getCreatedAt()),
    );
  }

  findTasks(userId: number): UsecaseTodoDto[] {
    const tasks = mockTaskList();
    return tasks.map((task) => {
      return this.todoDxo.convertToUsecaseTodoDto(
        new TodoDto(task.getId(), task.getTitle(), userId, task.getCreatedAt()),
      );
    });
  }

  insert(task: AddTodoDto): UsecaseTodoDto {
    const insertedTask = mockInsertedTask(task);
    return this.todoDxo.convertToUsecaseTodoDto(
      new TodoDto(
        insertedTask.getId(),
        insertedTask.getTitle(),
        task.getUserId(),
        insertedTask.getCreatedAt(),
      ),
    );
  }

  update(task: AddTodoDto): UsecaseTodoDto {
    const updatedTask = mockInsertedTask(task);
    return this.todoDxo.convertToUsecaseTodoDto(
      new TodoDto(
        updatedTask.getId(),
        updatedTask.getTitle(),
        task.getUserId(),
        updatedTask.getCreatedAt(),
      ),
    );
  }
}
