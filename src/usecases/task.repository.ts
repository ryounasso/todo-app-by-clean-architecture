import { Injectable } from '@nestjs/common';
import { TodoDto } from './todo.dto';
import { mockTaskList } from '../drivers/mock/task';

@Injectable()
export class TaskRepository {
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
}
