import { Injectable } from '@nestjs/common';
import { TodoDto } from '../usecases/todo.dto';
import { mockInsertedTask, mockTaskList } from '../drivers/mock/task';
import { AddTodoDto } from '../usecases/addTodo.dto';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskRepositoryImpl implements TaskRepository {
  findTasks(userId: number): TodoDto[] {
    const tasks = mockTaskList();
    return tasks.map((task) => {
      return new TodoDto(
        task.getId(),
        task.getTitle(),
        userId,
        task.getCreatedAt(),
      );
    });
  }

  insertTask(todo: AddTodoDto): TodoDto {
    const insertedTask = mockInsertedTask(todo);
    return new TodoDto(
      insertedTask.getId(),
      insertedTask.getTitle(),
      todo.getUserId(),
      insertedTask.getCreatedAt(),
    );
  }
}
