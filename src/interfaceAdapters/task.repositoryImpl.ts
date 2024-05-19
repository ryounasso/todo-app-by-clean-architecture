import { Inject, Injectable } from '@nestjs/common';
import { mockInsertedTask, mockTaskList } from '../drivers/mock/task';
import { TaskRepository } from './task.repository';
import { AddTodoDto } from './addTodo.dto';
import { TodoDto as UsecaseTodoDto } from '../usecases/todo.dto';
import { TodoDxo } from './todo.dxo';
import { TodoDto } from './todo.dto';
import { PrismaService } from './prisma.service';
import { UpdateTodoDto } from './updateTodo.dto';

@Injectable()
export class TaskRepositoryImpl implements TaskRepository {
  constructor(
    @Inject('AdapterTodoDxo') private readonly todoDxo: TodoDxo,
    @Inject('PrismaService') private readonly prisma: PrismaService,
  ) {}

  async findById(id: number): Promise<UsecaseTodoDto> {
    const task = await this.prisma.findTaskByUserId(id);
    if (!task) throw new Error('Task not found');
    return this.todoDxo.convertToUsecaseTodoDto(
      new TodoDto(task.id, task.title, id, task.createdAt),
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

  async update(task: UpdateTodoDto): Promise<UsecaseTodoDto> {
    const updatedTask = await this.prisma.updateTask({
      id: task.getId(),
      title: task.getTitle(),
    });

    return this.todoDxo.convertToUsecaseTodoDto(
      new TodoDto(
        updatedTask.id,
        updatedTask.title,
        updatedTask.userId,
        updatedTask.createdAt,
      ),
    );
  }
}
