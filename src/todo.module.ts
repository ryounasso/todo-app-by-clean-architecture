import { Module } from '@nestjs/common';
import { GetController } from './interfaceAdapters/controllers/get.controller';
import { TodoServiceImpl } from './usecases/todo.serviceImpl';
import { AddController } from './interfaceAdapters/controllers/add.controller';
import { TaskRepositoryImpl } from './interfaceAdapters/task.repositoryImpl';
import { TodoDxoImpl } from './usecases/todo.dxoImpl';
import { TodoDxoImpl as AdapterTodoDxoImpl } from './interfaceAdapters/todo.dxoImpl';
import { UpdateController } from './interfaceAdapters/controllers/update.controller';
import { PrismaServiceImpl } from './interfaceAdapters/prisma.serviceImpl';

@Module({
  imports: [],
  controllers: [GetController, AddController, UpdateController],
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
