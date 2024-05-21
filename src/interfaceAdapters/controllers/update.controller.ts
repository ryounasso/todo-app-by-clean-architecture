import {
  Body,
  Controller,
  Inject,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from 'src/usecases/todo.service';
import { UpdateOutputForm } from './update.outputform';
import { UpdateInputForm } from './update.inputform';
import { UpdateTodoDto } from 'src/usecases/update.todo.dto';

@Controller('todo.json')
export class UpdateController {
  constructor(
    @Inject('TodoService') private readonly todoService: TodoService,
  ) {}

  @Put()
  @UsePipes(new ValidationPipe({ transform: true }))
  async run(@Body() body: UpdateInputForm): Promise<UpdateOutputForm> {
    const todoDto = await this.todoService.setTodo(
      new UpdateTodoDto(Number.parseInt(body.getId()), body.getTitle()),
    );
    return new UpdateOutputForm(
      todoDto.getId(),
      todoDto.getUserId(),
      todoDto.getTitle(),
      todoDto.getCreatedAt(),
    );
  }
}