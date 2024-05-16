import { TodoDto } from '../usecases/todo.dto';
import { AddTodoDto } from '../usecases/addTodo.dto';

export interface TaskRepository {
  findTasks(userId: number): TodoDto[];

  insertTask(todo: AddTodoDto): TodoDto;
}
