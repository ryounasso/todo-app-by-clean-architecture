import { AddTodoDto } from './addTodo.dto';
import { TodoDto } from './todo.dto';
import { TodoDto as UsecaseTodoDto } from '../usecases/todo.dto';
import { UpdateTodoDto } from './updateTodo.dto';

export interface TaskRepository {
  findById(id: number): Promise<TodoDto>;

  findTasks(userId: number): Promise<TodoDto[]>;

  insert(todo: AddTodoDto): UsecaseTodoDto;

  update(todo: UpdateTodoDto): Promise<UsecaseTodoDto>;
}
