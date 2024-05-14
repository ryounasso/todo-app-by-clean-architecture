import { TodoDto } from './todo.dto';
export declare class TaskRepository {
    findTasks(userId: number): TodoDto[];
}
