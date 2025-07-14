import { AddTodoDto } from './addTodo.dto';
import { Todo } from '../../entities/todo';

export interface TodoRepository {
  findById(id: number): Promise<Todo>;

  findTodoList(userId: number): Promise<Todo[]>;

  findTodoListExcludeDone(userId: number): Promise<Todo[]>;

  insert(todo: AddTodoDto): Promise<Todo>;

  update(todo: Todo): Promise<Todo>;
}
