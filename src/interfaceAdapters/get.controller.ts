import { Controller, Get, Inject, Query } from '@nestjs/common';
import { TodoService } from 'src/usecases/todo.service';
import { GetOutputForm } from './get.outputform';

@Controller('todo')
export class GetController {
  constructor(
    @Inject('TodoService') private readonly todoService: TodoService,
  ) {}

  @Get('list')
  run(@Query('user_id') user_id: number): GetOutputForm[] {
    if (!user_id) throw new Error('user_id is required');

    const taskDto = this.todoService.getTodoList(user_id);
    return taskDto.map((task) => {
      return new GetOutputForm(
        task.getId(),
        user_id,
        task.getTitle(),
        task.getCreatedAt(),
      );
    });
  }
}
