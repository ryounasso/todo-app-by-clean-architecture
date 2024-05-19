import { AddTodoDto } from './addTodo.dto';
import { TodoDto as UsecaseTodoDto } from '../../usecases/todo.dto';
import { UpdateTodoDto } from './updateTodo.dto';

export interface TaskRepository {
  findById(id: number): Promise<UsecaseTodoDto>;

  findTasks(userId: number): Promise<UsecaseTodoDto[]>;

  insert(todo: AddTodoDto): Promise<UsecaseTodoDto>;

  update(todo: UpdateTodoDto): Promise<UsecaseTodoDto>;
}
