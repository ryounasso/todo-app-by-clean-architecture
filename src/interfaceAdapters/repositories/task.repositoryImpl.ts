import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { AddTodoDto } from './addTodo.dto';
import { TodoDxo } from '../todo.dxo';
import { PrismaService } from '../../drivers/prisma.service';
import { UpdateTodoDto } from './updateTodo.dto';
import { Todo } from '../../entities/todo';
import { StatusType } from '../../entities/status.type';

@Injectable()
export class TaskRepositoryImpl implements TaskRepository {
  constructor(
    @Inject('AdapterTodoDxo') private readonly todoDxo: TodoDxo,
    @Inject('PrismaService') private readonly prisma: PrismaService,
  ) {}

  async findById(id: number): Promise<Todo> {
    const task = await this.prisma.findTaskByUserId(id);
    if (!task) throw new Error('Task not found');
    return new Todo(
      task.id,
      task.title,
      task.status as StatusType,
      task.userId,
      task.createdAt,
      task.finishedAt,
    );
  }

  async findTasks(userId: number): Promise<Todo[]> {
    const tasks = await this.prisma.findTasksByUserId(userId);
    return tasks.map(
      (task) =>
        new Todo(
          task.id,
          task.title,
          task.status as StatusType,
          task.userId,
          task.createdAt,
          task.finishedAt,
        ),
    );
  }

  async findTasksExcludeDone(userId: number): Promise<Todo[]> {
    const tasks = await this.prisma.findTasksExcludeDone(userId);
    return tasks.map(
      (task) =>
        new Todo(
          task.id,
          task.title,
          task.status as StatusType,
          task.userId,
          task.createdAt,
          task.finishedAt,
        ),
    );
  }

  async findTaskbySpecifiedFields(
    id: number,
    spesifiedFilelds: (keyof Todo)[],
  ): Promise<Todo[]> {
    const tasks = await this.prisma.findTaskExcludeSpecifiedFields(
      id,
      spesifiedFilelds,
    );
    return tasks.map(
      (task) =>
        new Todo(
          task.id,
          task.title,
          task.status as StatusType,
          task.userId,
          task.createdAt,
          task.finishedAt,
        ),
    );
  }

  async findTaskbySpecifiedFieldsAndExcludeDoneTask(
    id: number,
    spesifiedFilelds: (keyof Todo)[],
  ): Promise<Todo[]> {
    const tasks =
      await this.prisma.findTaskExcludeSpecifiedFieldsAndExcludeDoneTask(
        id,
        spesifiedFilelds,
      );
    return tasks.map(
      (task) =>
        new Todo(
          task.id,
          task.title,
          task.status as StatusType,
          task.userId,
          task.createdAt,
          task.finishedAt,
        ),
    );
  }

  async insert(task: AddTodoDto): Promise<Todo> {
    const insertedTask = await this.prisma.insertTask(task);
    return new Todo(
      insertedTask.id,
      insertedTask.title,
      insertedTask.status as StatusType,
      insertedTask.userId,
      insertedTask.createdAt,
      insertedTask.finishedAt,
    );
  }

  async update(updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const updateValue = this.createUpdateObjectExcludeNullValue(updateTodoDto);
    if (!updateValue) throw new Error('Invalid update value');
    const updatedTask = await this.prisma.updateTask(updateValue);

    return new Todo(
      updatedTask.id,
      updatedTask.title,
      updatedTask.status as StatusType,
      updatedTask.userId,
      updatedTask.createdAt,
      updatedTask.finishedAt,
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
