import { TodoDto } from './todo.dto';
import { TodoDto as AdapterTodoDto } from '../interfaceAdapters/todo.dto';
import { AddTodoDto } from './addTodo.dto';
import { AddTodoDto as AdapterAddTodoDto } from '../interfaceAdapters/addTodo.dto';

export interface TodoDxo {
  convertToTodoDto(todoDto: TodoDto): AdapterTodoDto;

  convertToAddTodoDto(addTodoDto: AddTodoDto): AdapterAddTodoDto;
}
