import { AddTodoDto } from './addTodo.dto';
import { TodoDto } from './todo.dto';
import { UpdateTodoDto } from './update.todo.dto';

export interface TodoService {
  getTodoList(userId: number): TodoDto[];

  addTodo(addTodoDto: AddTodoDto): TodoDto;

  setTodo(todoDto: UpdateTodoDto): Promise<TodoDto>;
}
