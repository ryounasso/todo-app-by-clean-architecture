import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Models, UpdateTodo } from './prisma.service';
import { AddTodoDto } from './task/addTodo.dto';

@Injectable()
export class PrismaServiceImpl extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async findTaskByUserId(id: number) {
    return await this.task.findUnique({ where: { id } });
  }

  async findTasksByUserId(userId: number) {
    return await this.task.findMany({
      where: { userId: userId },
      orderBy: { id: 'asc' },
    });
  }

  async findTasksExcludeDone(userId: number) {
    return await this.task.findMany({
      where: { userId: userId, status: { not: 'done' } },
      orderBy: { id: 'asc' },
    });
  }

  async findTaskExcludeSpecifiedFields(
    userId: number,
    spesifiedFilelds: (keyof Models['fields'])[],
  ) {
    return await this.task.findMany({
      where: { userId: userId },
      select: this.prismaSpecifyFields(this.task.fields, spesifiedFilelds),
      orderBy: { id: 'asc' },
    });
  }

  async findTaskExcludeSpecifiedFieldsAndExcludeDoneTask(
    userId: number,
    spesifiedFilelds: (keyof Models['fields'])[],
  ) {
    return await this.task.findMany({
      where: { userId: userId, status: { not: 'done' } },
      select: this.prismaSpecifyFields(this.task.fields, spesifiedFilelds),
      orderBy: { id: 'asc' },
    });
  }

  async insertTask(addTodoDto: AddTodoDto) {
    return await this.task.create({
      data: { title: addTodoDto.getTitle(), userId: addTodoDto.getUserId() },
    });
  }

  async updateTask(task: UpdateTodo) {
    return await this.task.update({
      where: { id: task.id },
      data: task,
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
