import { Inject, Injectable } from '@nestjs/common';
import { mockInsertedTask, mockTaskList } from '../drivers/mock/task';
import { TaskRepository } from './task.repository';
import { AddTodoDto } from './addTodo.dto';
import { TodoDto as UsecaseTodoDto } from '../usecases/todo.dto';
import { TodoDxo } from './todo.dxo';
import { TodoDto } from './todo.dto';

@Injectable()
export class TaskRepositoryImpl implements TaskRepository {
  constructor(@Inject('AdapterTodoDxo') private readonly todoDxo: TodoDxo) {}

  findTasks(userId: number): UsecaseTodoDto[] {
    const tasks = mockTaskList();
    return tasks.map((task) => {
      return this.todoDxo.convertToUsecaseTodoDto(
        new TodoDto(task.getId(), task.getTitle(), userId, task.getCreatedAt()),
      );
    });
  }

  insertTask(todo: AddTodoDto): UsecaseTodoDto {
    const insertedTask = mockInsertedTask(todo);
    return this.todoDxo.convertToUsecaseTodoDto(
      new TodoDto(
        insertedTask.getId(),
        insertedTask.getTitle(),
        todo.getUserId(),
        insertedTask.getCreatedAt(),
      ),
    );
  }
}
