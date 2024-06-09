import {
  Body,
  Controller,
  Inject,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from 'src/usecases/todo.service';
import { UpdateInputForm } from './update.inputform';
import { TodoDto } from '../todo.dto';

@Controller('todo.json')
export class UpdateController {
  constructor(
    @Inject('TodoService') private readonly todoService: TodoService,
  ) {}

  @Put()
  @UsePipes(new ValidationPipe({ transform: true }))
  async run(@Body() body: UpdateInputForm): Promise<TodoDto> {
    return await this.todoService.updateTitle(
      Number.parseInt(body.getId()),
      body.getTitle(),
    );
  }
}
