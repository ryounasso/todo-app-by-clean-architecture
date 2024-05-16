import { Module } from '@nestjs/common';
import { GetController } from './interfaceAdapters/controllers/get.controller';
import { TodoServiceImpl } from './usecases/todo.serviceImpl';
import { AddController } from './interfaceAdapters/controllers/add.controller';
import { TaskRepositoryImpl } from './interfaceAdapters/task.repositoryImpl';
import { TodoDxoImpl } from './usecases/todo.dxoImpl';
import { TodoDxoImpl as AdapterTodoDxoImpl } from './interfaceAdapters/todo.dxoImpl';

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
    {
      provide: 'UsecaseTodoDxo',
      useClass: TodoDxoImpl,
    },
    {
      provide: 'AdapterTodoDxo',
      useClass: AdapterTodoDxoImpl,
    },
  ],
})
export class TodoModule {}
