import { Controller, Get, Inject, Query } from '@nestjs/common';
import { TodoService } from 'src/usecases/todo.service';
import { Todo } from '../../entities/todo';
import { TodoListDto } from 'src/usecases/todoList.dto';

@Controller('todo')
export class GetController {
  constructor(
    @Inject('TodoService') private readonly todoService: TodoService,
  ) {}

  @Get('list.json')
  async run(
    @Query('user_id') user_id: string,
    @Query('exclude_done_todo') exclude_done_todo?: boolean,
    @Query('fields') field?: string,
  ): Promise<TodoListDto> {
    if (!user_id) throw new Error('user_id is required');

    const fields = field ? field.split(',') : [];

    return await this.todoService.getTodoList(
      Number.parseInt(user_id),
      fields as (keyof Todo)[],
      exclude_done_todo,
    );
  }
}
