import { TaskRepository } from './task.repository';
import { TodoService } from './todo.service';
import { TodoDto } from './todo.dto';
export declare class TodoServiceImpl implements TodoService {
    private readonly taskRepository;
    constructor(taskRepository: TaskRepository);
    getTodoList(userId: number): TodoDto[];
}
