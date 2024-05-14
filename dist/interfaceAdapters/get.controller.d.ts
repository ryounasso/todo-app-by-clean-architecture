import { TodoService } from 'src/usecases/todo.service';
import { GetOutputForm } from './get.outputform';
export declare class GetController {
    private readonly todoService;
    constructor(todoService: TodoService);
    run(user_id: number): GetOutputForm[];
}
