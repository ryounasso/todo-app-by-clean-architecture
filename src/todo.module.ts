import { Module } from '@nestjs/common';
import { GetController } from './interfaceAdapters/get.controller';
import { TodoServiceImpl } from './usecases/todo.serviceImpl';
import { AddController } from './interfaceAdapters/add.controller';
import { TaskRepositoryImpl } from './interfaceAdapters/task.repositoryImpl';

@Module({
  imports: [],
  controllers: [GetController, AddController],
  providers: [
    {
      provide: 'TodoService',
      useClass: TodoServiceImpl,
    },
    {
      provide: 'TaskRepository',
      useClass: TaskRepositoryImpl,
    },
  ],
})
export class TodoModule {}
