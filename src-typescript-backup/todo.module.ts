import { Module } from '@nestjs/common';
import { GetController } from './interfaceAdapters/controllers/get.controller';
import { TodoServiceImpl } from './usecases/todo.serviceImpl';
import { AddController } from './interfaceAdapters/controllers/add.controller';
import { TodoRepositoryImpl } from './interfaceAdapters/repositories/todo.repositoryImpl';
import { TodoFactoryImpl } from './usecases/todo.factoryImpl';
import { UpdateController } from './interfaceAdapters/controllers/update.controller';
import { PostController } from './interfaceAdapters/controllers/post.controller';

@Module({
  imports: [],
  controllers: [GetController, AddController, UpdateController, PostController],
  providers: [
    {
      provide: 'TodoService',
      useClass: TodoServiceImpl,
    },
    {
      provide: 'TodoRepository',
      useClass: TodoRepositoryImpl,
    },
    {
      provide: 'UsecaseTodoFactory',
      useClass: TodoFactoryImpl,
    },
  ],
})
export class TodoModule {}
