import { Module } from '@nestjs/common';
import { GetController } from './interfaceAdapters/task/get.controller';
import { TodoServiceImpl } from './usecases/todo.serviceImpl';
import { AddController } from './interfaceAdapters/task/add.controller';
import { TaskRepositoryImpl } from './interfaceAdapters/task/task.repositoryImpl';
import { TodoDxoImpl } from './usecases/todo.dxoImpl';
import { TodoDxoImpl as AdapterTodoDxoImpl } from './interfaceAdapters/task/todo.dxoImpl';
import { UpdateController } from './interfaceAdapters/task/update.controller';
import { PrismaServiceImpl } from './interfaceAdapters/prisma.serviceImpl';
import { PostController } from './interfaceAdapters/task/post.controller';

@Module({
  imports: [],
  controllers: [GetController, AddController, UpdateController, PostController],
  providers: [
    {
      provide: 'TodoService',
      useClass: TodoServiceImpl,
    },
    {
      provide: 'TaskRepository',
      useClass: TaskRepositoryImpl,
    },
    {
      provide: 'UsecaseTodoDxo',
      useClass: TodoDxoImpl,
    },
    {
      provide: 'AdapterTodoDxo',
      useClass: AdapterTodoDxoImpl,
    },
    { provide: 'PrismaService', useClass: PrismaServiceImpl },
  ],
})
export class TodoModule {}
