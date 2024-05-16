import { AddTodoDto } from './addTodo.dto';
import { TodoDto } from './todo.dto';
import { TodoDto as UsecaseTodoDto } from '../usecases/todo.dto';

export interface TaskRepository {
  findTasks(userId: number): TodoDto[];

  insertTask(todo: AddTodoDto): UsecaseTodoDto;
}
