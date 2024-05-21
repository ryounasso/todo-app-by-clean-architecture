import { TodoDto as UsecaseDto } from '../usecases/todo.dto';
import { TodoDto } from './todo.dto';

export interface TodoDxo {
  convertToUsecaseTodoDto(todoDto: TodoDto): UsecaseDto;
}
