import {
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from 'src/usecases/todo.service';
import { UpdateOutputForm } from './post.outputform';
import { UpdateInputForm } from './post.inputform';

@Controller('todo')
export class PostController {
  constructor(
    @Inject('TodoService') private readonly todoService: TodoService,
  ) {}

  @Post('start.json')
  @UsePipes(new ValidationPipe({ transform: true }))
  async run(@Body() body: UpdateInputForm): Promise<UpdateOutputForm> {
    const todoDto = await this.todoService.startTodo(
      Number.parseInt(body.getId()),
    );
    return new UpdateOutputForm(todoDto.getTodoId(), todoDto.getStatus());
  }

  @Post('done.json')
  @UsePipes(new ValidationPipe({ transform: true }))
  async done(@Body() body: UpdateInputForm): Promise<UpdateOutputForm> {
    const todoDto = await this.todoService.done(Number.parseInt(body.getId()));
    return new UpdateOutputForm(todoDto.getTodoId(), todoDto.getStatus());
  }
}
