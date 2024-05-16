import { TaskRepository } from '../interfaceAdapters/task.repository';
import { TodoService } from './todo.service';
import { Inject, Injectable } from '@nestjs/common';
import { TodoDto } from './todo.dto';
import { AddTodoDto } from './addTodo.dto';
import { TodoDxo } from './todo.dxo';

@Injectable()
export class TodoServiceImpl implements TodoService {
  constructor(
    @Inject('TaskRepository') private readonly taskRepository: TaskRepository,
    @Inject('UsecaseTodoDxo') private readonly todoDxo: TodoDxo,
  ) {}

  getTodoList(userId: number): TodoDto[] {
    return this.taskRepository.findTasks(userId);
  }

  addTodo(addTodoDto: AddTodoDto): TodoDto {
    return this.taskRepository.insertTask(
      this.todoDxo.convertToAddTodoDto(addTodoDto),
    );
  }
}
