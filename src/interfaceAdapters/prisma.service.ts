import { Task } from '@prisma/client';
import { AddTodoDto } from './task/addTodo.dto';
import { StatusType } from '../entities/status.type';

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

export interface PrismaService {
  onModuleInit(): void;

  findTaskByUserId(id: number): Promise<Task>;

  findTasksByUserId(userId: number): Promise<Task[]>;

  findTasksExcludeDone(userId: number): Promise<Task[]>;

  insertTask(addTodoDto: AddTodoDto): Promise<Task>;

  updateTask(task: UpdateTodo): Promise<Task>;
}