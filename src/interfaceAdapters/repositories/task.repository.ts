import { AddTodoDto } from './addTodo.dto';
import { UpdateTodoDto } from './updateTodo.dto';
import { Todo } from '../../entities/todo';

export interface TaskRepository {
  findById(id: number): Promise<Todo>;

  findTasks(userId: number): Promise<Todo[]>;

  findTasksExcludeDone(userId: number): Promise<Todo[]>;

  findTaskbySpecifiedFields(
    id: number,
    spesifiedFilelds: (keyof Todo)[],
  ): Promise<Todo[]>;

  findTaskbySpecifiedFieldsAndExcludeDoneTask(
    id: number,
    spesifiedFilelds: (keyof Todo)[],
  ): Promise<Todo[]>;

  insert(todo: AddTodoDto): Promise<Todo>;

  update(todo: UpdateTodoDto): Promise<Todo>;
}
