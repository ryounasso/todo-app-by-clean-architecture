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

  async findTasksExcludeDone(userId: number): Promise<Task[]> {
    const tasks = await this.prisma.findTasksExcludeDone(userId);
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
    const obj: {
      id: number;
      title?: string;
      status?: string;
      finishedAt?: Date;
    } = { id: updateTodoDto.getId() };
    if (updateTodoDto.getTitle() !== null) obj.title = updateTodoDto.getTitle();
    if (updateTodoDto.getStatus() !== null) {
      obj.status = updateTodoDto.getStatus();
    }
    if (updateTodoDto.getFinishiedAt() !== null)
      obj.finishedAt = updateTodoDto.getFinishiedAt();

    return obj;
  }
}
