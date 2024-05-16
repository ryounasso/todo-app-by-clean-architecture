import { TodoDto } from './todo.dto';
import { TodoDxo } from './todo.dxo';
import { TodoDto as AdapterTodoDto } from '../interfaceAdapters/todo.dto';
import { AddTodoDto } from './addTodo.dto';
import { AddTodoDto as AdapterAddTodoDto } from '../interfaceAdapters/addTodo.dto';

export class TodoDxoImpl implements TodoDxo {
  convertToTodoDto(todoDto: TodoDto): AdapterTodoDto {
    return new AdapterTodoDto(
      todoDto.getId(),
      todoDto.getTitle(),
      todoDto.getUserId(),
      todoDto.getCreatedAt(),
    );
  }

  convertToAddTodoDto(addTodoDto: AddTodoDto): AdapterAddTodoDto {
    return new AdapterAddTodoDto(addTodoDto.getUserId(), addTodoDto.getTitle());
  }
}
