import { TaskRepository } from '../interfaceAdapters/task/task.repository';
import { TodoService } from './todo.service';
import { Inject, Injectable } from '@nestjs/common';
import { TodoDto } from './todo.dto';
import { AddTodoDto } from './addTodo.dto';
import { TodoDxo } from './todo.dxo';
import { UpdateTodoDto } from './update.todo.dto';
import { StartDto } from './start.dto';
import { DoneDto } from './done.dto';

@Injectable()
export class TodoServiceImpl implements TodoService {
  constructor(
    @Inject('TaskRepository') private readonly taskRepository: TaskRepository,
    @Inject('UsecaseTodoDxo') private readonly todoDxo: TodoDxo,
  ) {}

  async getTodoList(userId: number): Promise<TodoDto[]> {
    const taskList = await this.taskRepository.findTasks(userId);
    return taskList.map((task) => {
      return new TodoDto(
        task.getId(),
        task.getTitle(),
        task.getUserId(),
        task.getStatus(),
        task.getCreatedAt(),
      );
    });
  }

  async addTodo(addTodoDto: AddTodoDto): Promise<TodoDto> {
    const task = await this.taskRepository.insert(
      this.todoDxo.convertToAddTodoDto(addTodoDto),
    );
    return new TodoDto(
      task.getId(),
      task.getTitle(),
      task.getUserId(),
      task.getStatus(),
      task.getCreatedAt(),
    );
  }

  async setTodo(updateTodoDto: UpdateTodoDto): Promise<TodoDto> {
    const task = await this.taskRepository.update(
      this.todoDxo.convertToUpdateTodoDto(
        new UpdateTodoDto(updateTodoDto.getId(), updateTodoDto.getTitle()),
      ),
    );

    return new TodoDto(
      task.getId(),
      task.getTitle(),
      task.getUserId(),
      task.getStatus(),
      task.getCreatedAt(),
    );
  }

  async startTodo(id: number): Promise<StartDto> {
    const task = await this.taskRepository.update(
      new UpdateTodoDto(id, undefined, 'doing'),
    );
    return new StartDto(task.getId(), task.getStatus());
  }

  async done(id: number): Promise<DoneDto> {
    const task = await this.taskRepository.update(
      new UpdateTodoDto(id, undefined, 'done', new Date()),
    );
    return new DoneDto(task.getId(), task.getStatus());
  }
}
