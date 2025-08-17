import { Injectable, OnModuleInit } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { AddTodoDto } from './addTodo.dto';
import { Todo } from '../../entities/todo';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TodoRepositoryImpl
  extends PrismaClient
  implements OnModuleInit, TodoRepository
{
  async onModuleInit() {
    await this.$connect();
  }

  async findById(id: number): Promise<Todo> {
    const todo = await this.todo.findUnique({ where: { id } });
    if (!todo) throw new Error('Todo not found');
    return new Todo(
      todo.id,
      todo.title,
      todo.status,
      todo.userId,
      todo.createdAt,
      todo.finishedAt,
    );
  }

  async findTodoList(userId: number): Promise<Todo[]> {
    const todoList = await await this.todo.findMany({
      where: { userId: userId },
      orderBy: { id: 'asc' },
    });
    return todoList.map(
      (todo) =>
        new Todo(
          todo.id,
          todo.title,
          todo.status,
          todo.userId,
          todo.createdAt,
          todo.finishedAt,
        ),
    );
  }

  async findTodoListExcludeDone(userId: number): Promise<Todo[]> {
    const todoList = await this.todo.findMany({
      where: { userId: userId, status: { not: 'done' } },
      orderBy: { id: 'asc' },
    });
    return todoList.map(
      (todo) =>
        new Todo(
          todo.id,
          todo.title,
          todo.status,
          todo.userId,
          todo.createdAt,
          todo.finishedAt,
        ),
    );
  }

  async insert(todo: AddTodoDto): Promise<Todo> {
    const insertedTodo = await this.todo.create({
      data: {
        title: todo.getTitle(),
        userId: todo.getUserId(),
        status: todo.getStatus(),
      },
    });
    return new Todo(
      insertedTodo.id,
      insertedTodo.title,
      insertedTodo.status,
      insertedTodo.userId,
      insertedTodo.createdAt,
      insertedTodo.finishedAt,
    );
  }

  async update(todo: Todo): Promise<Todo> {
    const updatedTodo = await this.todo.update({
      where: { id: todo.getId() },
      data: {
        title: todo.getTitle(),
        status: todo.getStatus(),
        userId: todo.getUserId(),
        createdAt: todo.getCreatedAt(),
        finishedAt: todo.getFinishedAt(),
      },
    });

    return new Todo(
      updatedTodo.id,
      updatedTodo.title,
      updatedTodo.status,
      updatedTodo.userId,
      updatedTodo.createdAt,
      updatedTodo.finishedAt,
    );
  }
}
