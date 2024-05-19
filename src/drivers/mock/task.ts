import { AddTodoDto } from 'src/interfaceAdapters/task/addTodo.dto';
import { Task } from '../../entities/task';

export const mockTask = (id: number): Task => {
  return new Task(id, 'Task 1', new Date());
};

export const mockTaskList = (): Task[] => {
  return [
    new Task(1, 'Task 1', new Date()),
    new Task(2, 'Task 2', new Date()),
    new Task(3, 'Task 3', new Date()),
  ];
};

export const mockInsertedTask = (todoDto: AddTodoDto): Task => {
  return new Task(1, todoDto.getTitle(), new Date());
};
