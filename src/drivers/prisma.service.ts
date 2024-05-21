import { PrismaClient, Task } from '@prisma/client';
import { AddTodoDto } from '../interfaceAdapters/repositories/addTodo.dto';
import { StatusType } from '../entities/status.type';
import { Todo } from '../entities/todo';

export type UpdateTodo = {
  id: number;
  title?: string;
  status?: string;
  finishedAt?: Date;
};

export type UpdateStatus = {
  taskId: number;
  status: StatusType;
};

export type Models = Extract<
  PrismaClient[keyof PrismaClient],
  { fields: unknown }
>;

export interface PrismaService {
  onModuleInit(): void;

  findTaskByUserId(id: number): Promise<Task>;

  findTasksByUserId(userId: number): Promise<Task[]>;

  findTasksExcludeDone(userId: number): Promise<Task[]>;

  findTaskExcludeSpecifiedFields(
    id: number,
    spesifiedFilelds: (keyof Todo)[],
  ): Promise<Task[]>;

  findTaskExcludeSpecifiedFieldsAndExcludeDoneTask(
    id: number,
    spesifiedFilelds: (keyof Todo)[],
  ): Promise<Task[]>;

  insertTask(addTodoDto: AddTodoDto): Promise<Task>;

  updateTask(task: UpdateTodo): Promise<Task>;
}
