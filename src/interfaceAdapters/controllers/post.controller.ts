import {
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from 'src/usecases/todo.service';
import { UpdateInputForm } from './post.inputform';
import { StartDto } from 'src/usecases/start.dto';
import { DoneDto } from 'src/usecases/done.dto';

@Controller('todo')
export class PostController {
  constructor(
    @Inject('TodoService') private readonly todoService: TodoService,
  ) {}

  @Post('start.json')
  @UsePipes(new ValidationPipe({ transform: true }))
  async run(@Body() body: UpdateInputForm): Promise<StartDto> {
    return await this.todoService.startTodo(Number.parseInt(body.getId()));
  }

  @Post('done.json')
  @UsePipes(new ValidationPipe({ transform: true }))
  async done(@Body() body: UpdateInputForm): Promise<DoneDto> {
    return await this.todoService.done(Number.parseInt(body.getId()));
  }
}
