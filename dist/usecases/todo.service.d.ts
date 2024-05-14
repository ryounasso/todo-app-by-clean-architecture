import { TodoDto } from './todo.dto';
export interface TodoService {
    getTodoList(userId: number): TodoDto[];
}
