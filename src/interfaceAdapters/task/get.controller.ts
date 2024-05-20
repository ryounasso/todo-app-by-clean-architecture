import { Controller, Get, Inject, Query } from '@nestjs/common';
import { TodoService } from 'src/usecases/todo.service';
import { GetOutputForm } from './get.outputform';
import { Task } from '../../entities/task';

@Controller('todo')
export class GetController {
  constructor(
    @Inject('TodoService') private readonly todoService: TodoService,
  ) {}

  @Get('list.json')
  async run(
    @Query('user_id') user_id: string,
    @Query('exclude_done_task') exclude_done_task?: boolean,
    @Query('fields') field?: string,
  ): Promise<GetOutputForm[]> {
    if (!user_id) throw new Error('user_id is required');

    const fields = field ? field.split(',') : [];

    const taskDto = await this.todoService.getTodoList(
      Number.parseInt(user_id),
      fields as (keyof Task)[],
      exclude_done_task,
    );
    return taskDto.map((task) => {
      return new GetOutputForm(
        task.getId(),
        task.getUserId(),
        task.getTitle(),
        task.getCreatedAt(),
      );
    });
  }
}
