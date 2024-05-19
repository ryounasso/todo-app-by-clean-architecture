import { TodoDto } from './todo.dto';
import { TodoDto as AdapterTodoDto } from '../interfaceAdapters/task/todo.dto';
import { AddTodoDto } from './addTodo.dto';
import { AddTodoDto as AdapterAddTodoDto } from '../interfaceAdapters/task/addTodo.dto';
import { UpdateTodoDto } from './update.todo.dto';
import { UpdateTodoDto as AdapterUpdateTodoDto } from '../interfaceAdapters/task/updateTodo.dto';

export interface TodoDxo {
  convertToTodoDto(todoDto: TodoDto): AdapterTodoDto;

  convertToAddTodoDto(addTodoDto: AddTodoDto): AdapterAddTodoDto;

  convertToUpdateTodoDto(todoDto: UpdateTodoDto): AdapterUpdateTodoDto;
}
