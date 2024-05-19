import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { AddTodoDto } from './addTodo.dto';
import { TodoDxo } from './todo.dxo';
import { PrismaService } from '../prisma.service';
import { UpdateTodoDto } from './updateTodo.dto';
import { Task } from '../../entities/task';

@Injectable()
export class TaskRepositoryImpl implements TaskRepository {
  constructor(
    @Inject('AdapterTodoDxo') private readonly todoDxo: TodoDxo,
    @Inject('PrismaService') private readonly prisma: PrismaService,
  ) {}

  async findById(id: number): Promise<Task> {
    const task = await this.prisma.findTaskByUserId(id);
    if (!task) throw new Error('Task not found');
    return new Task(
      task.id,
      task.title,
      task.userId,
      task.status,
      task.createdAt,
    );
  }

  async findTasks(userId: number): Promise<Task[]> {
    const tasks = await this.prisma.findTasksByUserId(userId);
    return tasks.map(
      (task) =>
        new Task(task.id, task.title, task.userId, task.status, task.createdAt),
    );
  }

  async insert(task: AddTodoDto): Promise<Task> {
    const insertedTask = await this.prisma.insertTask(task);
    return new Task(
      insertedTask.id,
      insertedTask.title,
      insertedTask.userId,
      insertedTask.status,
      insertedTask.createdAt,
    );
  }

  async update(updateTodoDto: UpdateTodoDto): Promise<Task> {
    const updateValue = this.createUpdateObjectExcludeNullValue(updateTodoDto);
    if (!updateValue) throw new Error('Invalid update value');
    const updatedTask = await this.prisma.updateTask(updateValue);

    return new Task(
      updatedTask.id,
      updatedTask.title,
      updatedTask.userId,
      updatedTask.status,
      updatedTask.createdAt,
    );
  }

  private createUpdateObjectExcludeNullValue(updateTodoDto: UpdateTodoDto) {
    if (updateTodoDto.getTitle() === null) {
      if (updateTodoDto.getStatus() === null) {
        return null;
      } else {
        return { id: updateTodoDto.getId(), status: updateTodoDto.getStatus() };
      }
    } else {
      if (updateTodoDto.getStatus() === null) {
        return { id: updateTodoDto.getId(), title: updateTodoDto.getTitle() };
      }
    }
    return {
      id: updateTodoDto.getId(),
      title: updateTodoDto.getTitle(),
      status: updateTodoDto.getStatus(),
    };
  }
}
