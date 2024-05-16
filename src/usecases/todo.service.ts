import { AddTodoDto } from './addTodo.dto';
import { TodoDto } from './todo.dto';

export interface TodoService {
  getTodoList(userId: number): TodoDto[];

  addTodo(addTodoDto: AddTodoDto): TodoDto;
}
