import { TaskRepository } from './task.repository';
import { TodoService } from './todo.service';
import { Injectable } from '@nestjs/common';
import { TodoDto } from './todo.dto';
import { AddTodoDto } from './addTodo.dto';

@Injectable()
export class TodoServiceImpl implements TodoService {
  constructor(private readonly taskRepository: TaskRepository) {}

  getTodoList(userId: number): TodoDto[] {
    return this.taskRepository.findTasks(userId);
  }

  addTodo(todo: AddTodoDto): TodoDto {
    return this.taskRepository.insertTask(todo);
  }
}
