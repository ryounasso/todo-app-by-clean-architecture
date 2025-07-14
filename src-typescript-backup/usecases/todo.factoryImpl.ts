import { TodoFactory } from './todo.factory';
import { AddTodoDto } from './addTodo.dto';
import { AddTodoDto as AdapterAddTodoDto } from '../interfaceAdapters/repositories/addTodo.dto';

export class TodoFactoryImpl implements TodoFactory {
  convertToAddTodoDto(addTodoDto: AddTodoDto): AdapterAddTodoDto {
    return new AdapterAddTodoDto(
      addTodoDto.getUserId(),
      addTodoDto.getTitle(),
      addTodoDto.getStatus(),
    );
  }
}
