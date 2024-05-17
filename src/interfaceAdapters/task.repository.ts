import { AddTodoDto } from './addTodo.dto';
import { TodoDto } from './todo.dto';
import { TodoDto as UsecaseTodoDto } from '../usecases/todo.dto';

export interface TaskRepository {
  findById(id: number): TodoDto;

  findTasks(userId: number): TodoDto[];

  insert(todo: AddTodoDto): UsecaseTodoDto;

  update(todo: AddTodoDto): UsecaseTodoDto;
}
