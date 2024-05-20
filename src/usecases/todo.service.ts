import { AddTodoDto } from './addTodo.dto';
import { DoneDto } from './done.dto';
import { StartDto } from './start.dto';
import { TodoDto } from './todo.dto';
import { UpdateTodoDto } from './update.todo.dto';

export interface TodoService {
  getTodoList(userId: number): Promise<TodoDto[]>;

  addTodo(addTodoDto: AddTodoDto): Promise<TodoDto>;

  setTodo(todoDto: UpdateTodoDto): Promise<TodoDto>;

  startTodo(id: number): Promise<StartDto>;

  done(id: number): Promise<DoneDto>;
}
