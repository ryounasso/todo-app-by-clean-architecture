import { AddTodoDto } from './addTodo.dto';
import { UpdateTodoDto } from './updateTodo.dto';
import { Todo } from '../../entities/todo';
import { TodoListDto } from '../../usecases/todoListDto.dto';

export interface TodoRepository {
  findById(id: number): Promise<Todo>;

  findTodoList(userId: number): Promise<Todo[]>;

  findTodoListExcludeDone(userId: number): Promise<Todo[]>;

  findTodoListbySpecifiedFields(
    id: number,
    spesifiedFilelds: (keyof Todo)[],
  ): Promise<TodoListDto>;

  findTodobySpecifiedFieldsAndExcludeDoneTodo(
    id: number,
    spesifiedFilelds: (keyof Todo)[],
  ): Promise<TodoListDto>;

  insert(todo: AddTodoDto): Promise<Todo>;

  update(todo: UpdateTodoDto): Promise<Todo>;
}
