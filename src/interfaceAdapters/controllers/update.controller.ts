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

@Controller('todo')
export class UpdateController {
  constructor(
    @Inject('TodoService') private readonly todoService: TodoService,
  ) {}

  @Put('update.json')
  @UsePipes(new ValidationPipe({ transform: true }))
  run(@Body() body: UpdateInputForm): UpdateOutputForm {
    const todoDto = this.todoService.setTodo(
      new UpdateTodoDto(body.getId(), body.getTitle(), body.getUserId()),
    );
    return new UpdateOutputForm(
      todoDto.getId(),
      todoDto.getUserId(),
      todoDto.getTitle(),
      todoDto.getCreatedAt(),
    );
  }
}
