import { Todo } from '../entities/todo';
import { AddTodoDto } from './addTodo.dto';
import { DoneDto } from './done.dto';
import { TodoListDto } from './todoListDto.dto';
import { StartDto } from './start.dto';
import { TodoDto } from './todo.dto';
import { UpdateTodoDto } from './update.todo.dto';

export interface TodoService {
  getTodoList(
    userId: number,
    fields: (keyof Todo)[],
    exclude_done_todo?: boolean,
  ): Promise<TodoListDto>;

  addTodo(addTodoDto: AddTodoDto): Promise<TodoDto>;

  setTodo(todoDto: UpdateTodoDto): Promise<TodoDto>;

  startTodo(id: number): Promise<StartDto>;

  done(id: number): Promise<DoneDto>;
}
