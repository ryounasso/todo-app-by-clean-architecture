import { TaskRepository } from '../interfaceAdapters/task.repository';
import { TodoService } from './todo.service';
import { Inject, Injectable } from '@nestjs/common';
import { TodoDto } from './todo.dto';
import { AddTodoDto } from './addTodo.dto';
import { TodoDxo } from './todo.dxo';
import { UpdateTodoDto } from './update.todo.dto';

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
    return this.taskRepository.insert(
      this.todoDxo.convertToAddTodoDto(addTodoDto),
    );
  }

  async setTodo(updateTodoDto: UpdateTodoDto): Promise<TodoDto> {
    const task = await this.taskRepository.update(
      this.todoDxo.convertToUpdateTodoDto(
        new UpdateTodoDto(updateTodoDto.getId(), updateTodoDto.getTitle()),
      ),
    );

    return this.todoDxo.convertToTodoDto(
      new TodoDto(
        task.getId(),
        task.getTitle(),
        task.getUserId(),
        task.getCreatedAt(),
      ),
    );
  }
}
