import { Inject, Injectable } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { AddTodoDto } from './addTodo.dto';
import { PrismaService } from '../../drivers/prisma.service';
import { UpdateTodoDto } from './updateTodo.dto';
import { Todo } from '../../entities/todo';

// prisma を直接参照してよい

@Injectable()
export class TodoRepositoryImpl implements TodoRepository {
  constructor(
    @Inject('PrismaService') private readonly prisma: PrismaService,
  ) {}

  async findById(id: number): Promise<Todo> {
    const todo = await this.prisma.findTodoByUserId(id);
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
    const todoList = await this.prisma.findTodoListByUserId(userId);
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
    const todoList = await this.prisma.findTodoListExcludeDone(userId);
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
    const insertedTodo = await this.prisma.insertTodo(todo);
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
    const updatedTodo = await this.prisma.updateTodo(
      new UpdateTodoDto(
        todo.getId(),
        todo.getTitle(),
        todo.getStatus(),
        todo.getFinishedAt(),
      ),
    );

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
