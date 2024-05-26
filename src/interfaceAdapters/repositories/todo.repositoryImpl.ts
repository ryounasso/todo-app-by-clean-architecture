import { Inject, Injectable } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { AddTodoDto } from './addTodo.dto';
import { PrismaService } from '../../drivers/prisma.service';
import { UpdateTodoDto } from './updateTodo.dto';
import { Todo } from '../../entities/todo';

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

  async findTodoListbySpecifiedFields(
    id: number,
    spesifiedFilelds: (keyof Todo)[],
  ): Promise<Todo[]> {
    const todoList = await this.prisma.findTodoExcludeSpecifiedFields(
      id,
      spesifiedFilelds,
    );
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

  async findTodobySpecifiedFieldsAndExcludeDoneTodo(
    id: number,
    spesifiedFilelds: (keyof Todo)[],
  ): Promise<Todo[]> {
    const todoList =
      await this.prisma.findTodoExcludeSpecifiedFieldsAndExcludeDoneTodo(
        id,
        spesifiedFilelds,
      );
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

  async update(updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const updateValue = this.createUpdateObjectExcludeNullValue(updateTodoDto);
    if (!updateValue) throw new Error('Invalid update value');
    const updatedTodo = await this.prisma.updateTodo(updateValue);

    return new Todo(
      updatedTodo.id,
      updatedTodo.title,
      updatedTodo.status,
      updatedTodo.userId,
      updatedTodo.createdAt,
      updatedTodo.finishedAt,
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
