import { TaskRepository } from '../interfaceAdapters/repositories/task.repository';
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
    @Inject('TaskRepository') private readonly taskRepository: TaskRepository,
    @Inject('UsecaseTodoDxo') private readonly todoDxo: TodoDxo,
  ) {}

  async getTodoList(
    userId: number,
    fields: (keyof Todo)[],
    exclude_done_task?: boolean,
  ): Promise<TodoDto[]> {
    let taskList;
    if (exclude_done_task) {
      taskList = await this.taskRepository.findTasksExcludeDone(userId);
    } else {
      taskList = await this.taskRepository.findTasks(userId);
    }

    if (fields.length > 0) {
      if (exclude_done_task) {
        taskList =
          await this.taskRepository.findTaskbySpecifiedFieldsAndExcludeDoneTask(
            userId,
            fields,
          );
      } else {
        taskList = await this.taskRepository.findTaskbySpecifiedFields(
          userId,
          fields,
        );
      }
    }

    return taskList.map((task) => {
      return new TodoDto(
        task.getId(),
        task.getTitle(),
        task.getUserId(),
        task.getStatus(),
        task.getCreatedAt(),
        task.getFinishedAt(),
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
      task.getFinishedAt(),
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
      task.getFinishedAt(),
    );
  }

  async startTodo(id: number): Promise<StartDto> {
    // optional
    const task = await this.taskRepository.findById(id);
    task.start();

    const updatedTask = await this.taskRepository.update(task);
    return new StartDto(updatedTask.getId(), updatedTask.getStatus());
  }

  async done(id: number): Promise<DoneDto> {
    const task = await this.taskRepository.update(
      new UpdateTodoDto(id, undefined, 'done', new Date()),
    );
    return new DoneDto(task.getId(), task.getStatus());
  }
}
