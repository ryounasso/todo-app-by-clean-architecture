import { Test, TestingModule } from '@nestjs/testing';
import { TodoServiceImpl } from '../usecases/todo.serviceImpl';
import { TodoDto } from '../usecases/todo.dto';
import { AddTodoDto } from '../usecases/addTodo.dto';
import { TodoDxoImpl } from '../usecases/todo.dxoImpl';
import { TodoDxoImpl as AdapterTodoDxoImpl } from '../interfaceAdapters/todo.dxoImpl';
import { UpdateTodoDto } from '../usecases/update.todo.dto';

const mockTaskRepository = () => ({
  findById: jest.fn(),
  findTasks: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
});

const user_id = 1;

describe('TodoService', () => {
  let taskService: TodoServiceImpl;
  let taskRepository: any;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: 'TodoService', useClass: TodoServiceImpl },
        { provide: 'TaskRepository', useFactory: mockTaskRepository },
        { provide: 'UsecaseTodoDxo', useClass: TodoDxoImpl },
        { provide: 'AdapterTodoDxo', useClass: AdapterTodoDxoImpl },
      ],
    }).compile();

    taskService = app.get('TodoService');
    taskRepository = app.get('TaskRepository');
  });

  describe('root', () => {
    it('should return Task List', async () => {
      taskRepository.findTasks.mockReturnValue(createMockTodoDtos());
      const result = await taskService.getTodoList(user_id);
      const expected = createExpectedTodoDtos();
      result.forEach((task, index) => {
        expect(task).toEqual({
          id: expected[index].id,
          user_id: expected[index].user_id,
          title: expected[index].title,
          createdAt: expect.anything(),
        });
      });
    });

    it('should return created Todo', async () => {
      const title = 'Task 1';

      taskRepository.insert.mockReturnValue(
        createMockInsertedTask(user_id, title),
      );
      const result = await taskService.addTodo(new AddTodoDto(user_id, title));
      const expected = createExpectedTodoDto();
      expect(result).toEqual(expected);
    });

    it('should update Todo', async () => {
      const title = 'Task 1';
      const id = 1;
      const createdAt = new Date();

      taskRepository.findById.mockReturnValue(
        createExpectedTodoDto(title, createdAt),
      );

      taskRepository.update.mockReturnValue(
        createExpectedTodoDto(title, createdAt),
      );
      const result = await taskService.setTodo(new UpdateTodoDto(id, title));
      const expected = createExpectedTodoDto(undefined, createdAt);
      expect(result).toEqual(expected);
    });
  });
});

const createExpectedTodoDtos = (): TodoDto[] => {
  return [
    new TodoDto(1, 'Task 1', user_id, new Date()),
    new TodoDto(2, 'Task 2', user_id, new Date()),
    new TodoDto(3, 'Task 3', user_id, new Date()),
  ];
};

const createMockTodoDtos = (): TodoDto[] => {
  return [
    new TodoDto(1, 'Task 1', user_id, new Date()),
    new TodoDto(2, 'Task 2', user_id, new Date()),
    new TodoDto(3, 'Task 3', user_id, new Date()),
  ];
};

const createMockInsertedTask = (user_id: number, title: string): TodoDto => {
  return new TodoDto(1, title, user_id, new Date());
};

const createExpectedTodoDto = (
  title: string = 'Task 1',
  createdAt: Date = new Date(),
) => {
  return new TodoDto(1, title, user_id, createdAt);
};
