import { Module } from '@nestjs/common';
import { GetController } from './interfaceAdapters/get.controller';
import { TodoServiceImpl } from './usecases/task.serviceImpl';
import { TaskRepository } from './usecases/task.repository';

@Module({
  imports: [],
  controllers: [GetController],
  providers: [
    {
      provide: 'TodoService',
      useClass: TodoServiceImpl,
    },
    TaskRepository,
  ],
})
export class TodoModule {}
