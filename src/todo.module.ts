import { Module } from '@nestjs/common';
import { GetController } from './interfaceAdapters/get.controller';
import { TodoServiceImpl } from './usecases/todo.serviceImpl';
import { TaskRepository } from './usecases/task.repository';
import { AddController } from './interfaceAdapters/add.controller';

@Module({
  imports: [],
  controllers: [GetController, AddController],
  providers: [
    {
      provide: 'TodoService',
      useClass: TodoServiceImpl,
    },
    TaskRepository,
  ],
})
export class TodoModule {}
