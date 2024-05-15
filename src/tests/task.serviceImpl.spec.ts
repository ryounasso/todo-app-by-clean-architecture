import { Test, TestingModule } from '@nestjs/testing';
import { TodoServiceImpl } from '../usecases/task.serviceImpl';
import { TaskRepository } from '../usecases/task.repository';
import { TodoDto } from '../usecases/todo.dto';

const mockTaskRepository = () => ({
  findTasks: jest.fn(),
});

const user_id = 1;

describe('GetController', () => {
  let taskService: TodoServiceImpl;
  let taskRepository: any;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: 'TodoService', useClass: TodoServiceImpl },
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    taskService = app.get('TodoService');
    taskRepository = app.get(TaskRepository);
  });

  describe('root', () => {
    it('should return Task List', () => {
      taskRepository.findTasks.mockReturnValue(createMockTodoDto());
      const result = taskService.getTodoList(user_id);
      const expected = createExpectedGetOutputForm();
      result.forEach((task, index) => {
        expect(task).toEqual({
          id: expected[index].id,
          user_id: expected[index].user_id,
          title: expected[index].title,
          createdAt: expect.anything(),
        });
      });
    });
  });
});

const createExpectedGetOutputForm = (): TodoDto[] => {
  return [
    new TodoDto(1, 'Task 1', user_id, new Date()),
    new TodoDto(2, 'Task 2', user_id, new Date()),
    new TodoDto(3, 'Task 3', user_id, new Date()),
  ];
};

const createMockTodoDto = (): TodoDto[] => {
  return [
    new TodoDto(1, 'Task 1', user_id, new Date()),
    new TodoDto(2, 'Task 2', user_id, new Date()),
    new TodoDto(3, 'Task 3', user_id, new Date()),
  ];
};
