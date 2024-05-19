import { AddTodoDto } from './addTodo.dto';
import { UpdateTodoDto } from './updateTodo.dto';
import { Task } from '../../entities/task';

export interface TaskRepository {
  findById(id: number): Promise<Task>;

  findTasks(userId: number): Promise<Task[]>;

  insert(todo: AddTodoDto): Promise<Task>;

  update(todo: UpdateTodoDto): Promise<Task>;
}
