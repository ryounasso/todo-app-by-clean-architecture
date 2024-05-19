import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateTodo } from './prisma.service';

@Injectable()
export class PrismaServiceImpl extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async findTaskByUserId(id: number) {
    return await this.task.findUnique({ where: { id } });
  }

  async findTasksByUserId(userId: number) {
    return await this.task.findMany({ where: { userId: userId } });
  }

  async updateTask(task: UpdateTodo) {
    return await this.task.update({
      where: { id: task.id },
      data: {
        title: task.title,
      },
    });
  }
}
