import { Task } from '@prisma/client';

export type UpdateTodo = {
  id: number;
  title: string;
};

export interface PrismaService {
  onModuleInit(): void;

  findTaskByUserId(id: number): Promise<Task>;

  findTasksByUserId(userId: number): Promise<Task[]>;

  updateTask(task: UpdateTodo): Promise<Task>;
}
