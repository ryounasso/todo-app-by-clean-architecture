import { AddTodoDto } from './addTodo.dto';
import { UpdateTodoDto } from './updateTodo.dto';
import { Todo } from '../../entities/todo';

export interface TodoRepository {
  findById(id: number): Promise<Todo>;

  findTodoList(userId: number): Promise<Todo[]>;

  findTodoListExcludeDone(userId: number): Promise<Todo[]>;

  insert(todo: AddTodoDto): Promise<Todo>;

  update(todo: UpdateTodoDto): Promise<Todo>;
}
