import { TodoDto } from './todo.dto';
import { TodoDto as UsecaseDto } from '../../usecases/todo.dto';

export class TodoDxoImpl implements TodoDxoImpl {
  convertToUsecaseTodoDto(todoDto: TodoDto): UsecaseDto {
    return new UsecaseDto(
      todoDto.getId(),
      todoDto.getTitle(),
      todoDto.getUserId(),
      todoDto.getStatus(),
      todoDto.getCreatedAt(),
    );
  }
}
