import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Models } from './prisma.service';
import { AddTodoDto } from '../interfaceAdapters/repositories/addTodo.dto';
import { UpdateTodoDto } from 'src/interfaceAdapters/repositories/updateTodo.dto';

@Injectable()
export class PrismaServiceImpl extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async findTodoByUserId(id: number) {
    return await this.todo.findUnique({ where: { id } });
  }

  async findTodoListByUserId(userId: number) {
    return await this.todo.findMany({
      where: { userId: userId },
      orderBy: { id: 'asc' },
    });
  }

  async findTodoListExcludeDone(userId: number) {
    return await this.todo.findMany({
      where: { userId: userId, status: { not: 'done' } },
      orderBy: { id: 'asc' },
    });
  }

  async findTodoExcludeSpecifiedFields(
    userId: number,
    spesifiedFilelds: (keyof Models['fields'])[],
  ) {
    return await this.todo.findMany({
      where: { userId: userId },
      select: this.prismaSpecifyFields(this.todo.fields, spesifiedFilelds),
      orderBy: { id: 'asc' },
    });
  }

  async findTodoExcludeSpecifiedFieldsAndExcludeDoneTodo(
    userId: number,
    spesifiedFilelds: (keyof Models['fields'])[],
  ) {
    return await this.todo.findMany({
      where: { userId: userId, status: { not: 'done' } },
      select: this.prismaSpecifyFields(this.todo.fields, spesifiedFilelds),
      orderBy: { id: 'asc' },
    });
  }

  async insertTodo(addTodoDto: AddTodoDto) {
    return await this.todo.create({
      data: {
        title: addTodoDto.getTitle(),
        userId: addTodoDto.getUserId(),
        status: addTodoDto.getStatus(),
      },
    });
  }

  async updateTodo(todo: UpdateTodoDto) {
    return await this.todo.update({
      where: { id: todo.id },
      data: todo,
    });
  }

  private prismaSpecifyFields<
    T extends Models['fields'],
    ExcludeT extends (keyof T)[],
  >(fields: T, exclude: ExcludeT) {
    const keys = Object.keys(fields) as (keyof T)[];
    const excludeSet = new Set(exclude);
    const attributes: Partial<Record<keyof T[][number], boolean>> = {};
    for (const key of keys) {
      if (excludeSet.has(key)) attributes[key] = true;
      else attributes[key] = false;
    }

    type IncludeType = {
      [K in keyof T]: true;
    };
    type Result = Omit<IncludeType, ExcludeT[number]>;
    return attributes as Result;
  }
}
