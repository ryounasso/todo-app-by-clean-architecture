import { AddTodoDto } from './addTodo.dto';
import { DoneDto } from './done.dto';
import { TodoListDto } from './todoList.dto';
import { StartDto } from './start.dto';
import { TodoDto } from './todo.dto';
import { TodoTitleDto } from './todoTitle.dto';

export interface TodoService {
  getTodoList(
    userId: number,
    fields?: string[],
    exclude_done_todo?: boolean,
  ): Promise<TodoListDto>;

  addTodo(addTodoDto: AddTodoDto): Promise<TodoDto>;

  updateTitle(id: number, newTitle: string): Promise<TodoTitleDto>;

  startTodo(id: number): Promise<StartDto>;

  done(id: number): Promise<DoneDto>;
}
