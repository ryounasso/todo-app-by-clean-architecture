import { PrismaClient, Todo } from '@prisma/client';
import { AddTodoDto } from '../interfaceAdapters/repositories/addTodo.dto';
import { StatusType } from '../entities/status.type';
import { Todo as TodoEntity } from '../entities/todo';

export type UpdateTodo = {
  id: number;
  title?: string;
  status?: string;
  finishedAt?: Date;
};

export type UpdateStatus = {
  todoId: number;
  status: StatusType;
};

export type Models = Extract<
  PrismaClient[keyof PrismaClient],
  { fields: unknown }
>;

export interface PrismaService {
  onModuleInit(): void;

  findTodoByUserId(id: number): Promise<Todo>;

  findTodoListByUserId(userId: number): Promise<Todo[]>;

  findTodoListExcludeDone(userId: number): Promise<Todo[]>;

  findTodoExcludeSpecifiedFields(
    id: number,
    spesifiedFilelds: (keyof TodoEntity)[],
  ): Promise<Todo[]>;

  findTodoExcludeSpecifiedFieldsAndExcludeDoneTodo(
    id: number,
    spesifiedFilelds: (keyof TodoEntity)[],
  ): Promise<Todo[]>;

  insertTodo(addTodoDto: AddTodoDto): Promise<Todo>;

  updateTodo(todo: UpdateTodo): Promise<Todo>;
}
