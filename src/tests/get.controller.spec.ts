import { Test, TestingModule } from '@nestjs/testing';
import { GetController } from '../interfaceAdapters/controllers/get.controller';
import { TodoServiceImpl } from '../usecases/todo.serviceImpl';
import { GetOutputForm } from '../interfaceAdapters/controllers/get.outputform';
import { TodoDto } from '../usecases/todo.dto';
import { TodoDxoImpl } from '../usecases/todo.dxoImpl';
import { TodoDxoImpl as AdapterTodoDxoImpl } from '../interfaceAdapters/todo.dxoImpl';

const mockTaskRepository = () => ({
  findTasks: jest.fn(),
});

const user_id = 1;

describe('GetController', () => {
  let getController: GetController;
  let taskRepository: any;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GetController],
      providers: [
        { provide: 'TodoService', useClass: TodoServiceImpl },
        { provide: 'TaskRepository', useFactory: mockTaskRepository },
        { provide: 'UsecaseTodoDxo', useClass: TodoDxoImpl },
        { provide: 'AdapterTodoDxo', useClass: AdapterTodoDxoImpl },
      ],
    }).compile();

    getController = app.get<GetController>(GetController);
    taskRepository = app.get('TaskRepository');
  });

  describe('root', () => {
    it('should return Task List', () => {
      taskRepository.findTasks.mockReturnValue(createMockTodoDto());
      const result = getController.run(user_id);
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

const createExpectedGetOutputForm = (): GetOutputForm[] => {
  return [
    new GetOutputForm(1, user_id, 'Task 1', new Date()),
    new GetOutputForm(2, user_id, 'Task 2', new Date()),
    new GetOutputForm(3, user_id, 'Task 3', new Date()),
  ];
};

const createMockTodoDto = (): TodoDto[] => {
  return [
    new TodoDto(1, 'Task 1', user_id, new Date()),
    new TodoDto(2, 'Task 2', user_id, new Date()),
    new TodoDto(3, 'Task 3', user_id, new Date()),
  ];
};
