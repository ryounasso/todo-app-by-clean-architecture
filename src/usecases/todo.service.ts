import { Todo } from '../entities/todo';
import { AddTodoDto } from './addTodo.dto';
import { DoneDto } from './done.dto';
import { PartOfTodoDto } from './partOfTodo.dto';
import { StartDto } from './start.dto';
import { TodoDto } from './todo.dto';
import { UpdateTodoDto } from './update.todo.dto';

export interface TodoService {
  getTodoList(
    userId: number,
    fields: (keyof Todo)[],
    exclude_done_todo?: boolean,
  ): Promise<PartOfTodoDto[]>;

  addTodo(addTodoDto: AddTodoDto): Promise<TodoDto>;

  setTodo(todoDto: UpdateTodoDto): Promise<TodoDto>;

  startTodo(id: number): Promise<StartDto>;

  done(id: number): Promise<DoneDto>;
}
