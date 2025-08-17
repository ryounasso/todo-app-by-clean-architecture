import { AddTodoDto } from './addTodo.dto';
import { AddTodoDto as AdapterAddTodoDto } from '../interfaceAdapters/repositories/addTodo.dto';

export interface TodoFactory {
  convertToAddTodoDto(addTodoDto: AddTodoDto): AdapterAddTodoDto;
}
