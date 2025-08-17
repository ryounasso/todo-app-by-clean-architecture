import {
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from 'src/usecases/todo.service';
import { AddInputForm } from './add.inputform';
import { AddTodoDto } from 'src/usecases/addTodo.dto';
import { AddOutputForm } from './add.outputputform';

@Controller('todo.json')
export class AddController {
  constructor(
    @Inject('TodoService') private readonly todoService: TodoService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async run(@Body() body: AddInputForm): Promise<AddOutputForm> {
    const addedTodo = await this.todoService.addTodo(
      new AddTodoDto(Number.parseInt(body.getUserId()), body.getTitle()),
    );
    return new AddOutputForm(
      addedTodo.getId(),
      addedTodo.getUserId(),
      addedTodo.getTitle(),
      addedTodo.getCreatedAt(),
    );
  }
}
