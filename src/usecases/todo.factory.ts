import { TodoDto } from './todo.dto';
import { TodoDto as AdapterTodoDto } from '../interfaceAdapters/todo.dto';
import { AddTodoDto } from './addTodo.dto';
import { AddTodoDto as AdapterAddTodoDto } from '../interfaceAdapters/repositories/addTodo.dto';
import { UpdateTodoDto as AdapterUpdateTodoDto } from '../interfaceAdapters/repositories/updateTodo.dto';

export interface TodoFactory {
  convertToTodoDto(todoDto: TodoDto): AdapterTodoDto;

  convertToAddTodoDto(addTodoDto: AddTodoDto): AdapterAddTodoDto;

  convertToUpdateTodoDto(id: number, title: string): AdapterUpdateTodoDto;
}
