import { Test, TestingModule } from '@nestjs/testing';
import { TodoServiceImpl } from '../usecases/todo.serviceImpl';
import { TodoDto } from '../usecases/todo.dto';
import { AddTodoDto } from '../usecases/addTodo.dto';
import { TodoFactoryImpl } from '../usecases/todo.factoryImpl';
import { UpdateTodoDto } from '../usecases/update.todo.dto';

const mockTodoRepository = () => ({
  findById: jest.fn(),
  findTodoList: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
});

const user_id = 1;

describe('TodoService', () => {
  let todoService: TodoServiceImpl;
  let todoRepository: any;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: 'TodoService', useClass: TodoServiceImpl },
        { provide: 'TodoRepository', useFactory: mockTodoRepository },
        { provide: 'UsecaseTodoDxo', useClass: TodoFactoryImpl },
      ],
    }).compile();

    todoService = app.get('TodoService');
    todoRepository = app.get('TodoRepository');
  });

  describe('root', () => {
    it('should return Todo List', async () => {
      todoRepository.findTodoList.mockReturnValue(createMockTodoDtos());
      const result = await todoService.getTodoList(user_id, [], false);
      const expected = createExpectedTodoDtos();
      result.forEach((todo, index) => {
        expect(todo).toEqual({
          id: expected[index].id,
          userId: expected[index].userId,
          title: expected[index].title,
          status: expected[index].status,
          createdAt: expect.anything(),
        });
      });
    });

    it('should return created Todo', async () => {
      const title = 'Todo 1';

      todoRepository.insert.mockReturnValue(
        createMockInsertedTodo(user_id, title),
      );
      const result = await todoService.addTodo(new AddTodoDto(user_id, title));
      const expected = createExpectedTodoDto();
      expect(result).toEqual(expected);
    });

    it('should update Todo', async () => {
      const title = 'Todo 1';
      const id = 1;
      const createdAt = new Date();

      todoRepository.findById.mockReturnValue(
        createExpectedTodoDto(title, createdAt),
      );

      todoRepository.update.mockReturnValue(
        createExpectedTodoDto(title, createdAt),
      );
      const result = await todoService.setTodo(new UpdateTodoDto(id, title));
      const expected = createExpectedTodoDto(undefined, createdAt);
      expect(result).toEqual(expected);
    });
  });
});

const createExpectedTodoDtos = (): TodoDto[] => {
  return [
    new TodoDto(1, 'Todo 1', user_id, 'ready', new Date()),
    new TodoDto(2, 'Todo 2', user_id, 'ready', new Date()),
    new TodoDto(3, 'Todo 3', user_id, 'ready', new Date()),
  ];
};

const createMockTodoDtos = (): TodoDto[] => {
  return [
    new TodoDto(1, 'Todo 1', user_id, 'ready', new Date()),
    new TodoDto(2, 'Todo 2', user_id, 'ready', new Date()),
    new TodoDto(3, 'Todo 3', user_id, 'ready', new Date()),
  ];
};

const createMockInsertedTodo = (user_id: number, title: string): TodoDto => {
  return new TodoDto(1, title, user_id, 'ready', new Date());
};

const createExpectedTodoDto = (
  title: string = 'Todo 1',
  createdAt: Date = new Date(),
) => {
  return new TodoDto(1, title, user_id, 'ready', createdAt);
};
