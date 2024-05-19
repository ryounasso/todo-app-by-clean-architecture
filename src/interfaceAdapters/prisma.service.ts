import { Task } from '@prisma/client';
import { AddTodoDto } from './addTodo.dto';

export type UpdateTodo = {
  id: number;
  title: string;
};

export interface PrismaService {
  onModuleInit(): void;

  findTaskByUserId(id: number): Promise<Task>;

  findTasksByUserId(userId: number): Promise<Task[]>;

  insertTask(addTodoDto: AddTodoDto): Promise<Task>;

  updateTask(task: UpdateTodo): Promise<Task>;
}
