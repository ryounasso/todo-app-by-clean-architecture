import { Test, TestingModule } from '@nestjs/testing';
import { TodoServiceImpl } from '../usecases/todo.serviceImpl';
import { TodoDto } from '../usecases/todo.dto';
import { AddTodoDto } from '../usecases/addTodo.dto';

const mockTaskRepository = () => ({
  findTasks: jest.fn(),
  insertTask: jest.fn(),
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
      ],
    }).compile();

    taskService = app.get('TodoService');
    taskRepository = app.get('TaskRepository');
  });

  describe('root', () => {
    it('should return Task List', () => {
      taskRepository.findTasks.mockReturnValue(createMockTodoDtos());
      const result = taskService.getTodoList(user_id);
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

    it('should return created Todo', () => {
      const title = 'Task 1';

      taskRepository.insertTask.mockReturnValue(
        createMockInsertedTask(user_id, title),
      );
      const result = taskService.addTodo(new AddTodoDto(user_id, title));
      const expected = createExpectedTodoDto();
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

const createExpectedTodoDto = () => {
  return new TodoDto(1, 'Task 1', user_id, new Date());
};
