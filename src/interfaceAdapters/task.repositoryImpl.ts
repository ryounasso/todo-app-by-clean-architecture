import { Inject, Injectable } from '@nestjs/common';
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

  async findTasks(userId: number): Promise<UsecaseTodoDto[]> {
    const tasks = await this.prisma.findTasksByUserId(userId);
    return tasks.map((task) => {
      return this.todoDxo.convertToUsecaseTodoDto(
        new TodoDto(task.id, task.title, task.userId, task.createdAt),
      );
    });
  }

  async insert(task: AddTodoDto): Promise<UsecaseTodoDto> {
    const insertedTask = await this.prisma.insertTask(task);
    return this.todoDxo.convertToUsecaseTodoDto(
      new TodoDto(
        insertedTask.id,
        insertedTask.title,
        insertedTask.userId,
        insertedTask.createdAt,
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
