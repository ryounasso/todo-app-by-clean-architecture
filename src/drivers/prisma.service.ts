import { PrismaClient, Task } from '@prisma/client';
import { AddTodoDto } from '../interfaceAdapters/repositories/addTodo.dto';
import { StatusType } from '../entities/status.type';
import { Task as TaskEntity } from '../entities/task';

export type UpdateTodo = {
  id: number;
  title?: string;
  status?: string;
  finishiedAt?: Date;
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
    spesifiedFilelds: (keyof TaskEntity)[],
  ): Promise<Task[]>;

  findTaskExcludeSpecifiedFieldsAndExcludeDoneTask(
    id: number,
    spesifiedFilelds: (keyof TaskEntity)[],
  ): Promise<Task[]>;

  insertTask(addTodoDto: AddTodoDto): Promise<Task>;

  updateTask(task: UpdateTodo): Promise<Task>;
}
