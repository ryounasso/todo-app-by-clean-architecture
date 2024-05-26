import { Test, TestingModule } from '@nestjs/testing';
import { GetController } from '../interfaceAdapters/controllers/get.controller';
import { TodoServiceImpl } from '../usecases/todo.serviceImpl';
import { GetOutputForm } from '../interfaceAdapters/controllers/get.outputform';
import { TodoDto } from '../usecases/todo.dto';
import { TodoDxoImpl } from '../usecases/todo.dxoImpl';
import { TodoDxoImpl as AdapterTodoDxoImpl } from '../interfaceAdapters/todo.dxoImpl';

const mockTodoRepository = () => ({
  findTodoList: jest.fn(),
});

const user_id = 1;

describe('GetController', () => {
  let getController: GetController;
  let todoRepository: any;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GetController],
      providers: [
        { provide: 'TodoService', useClass: TodoServiceImpl },
        { provide: 'TodoRepository', useFactory: mockTodoRepository },
        { provide: 'UsecaseTodoDxo', useClass: TodoDxoImpl },
        { provide: 'AdapterTodoDxo', useClass: AdapterTodoDxoImpl },
      ],
    }).compile();

    getController = app.get<GetController>(GetController);
    todoRepository = app.get('TodoRepository');
  });

  describe('root', () => {
    it('should return Todo List', async () => {
      todoRepository.findTodoList.mockReturnValue(createMockTodoDto());
      const result = await getController.run(user_id.toString());
      const expected = createExpectedGetOutputForm();
      result.forEach((todo, index) => {
        expect(todo).toEqual({
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
    new GetOutputForm(1, user_id, 'Todo 1', new Date()),
    new GetOutputForm(2, user_id, 'Todo 2', new Date()),
    new GetOutputForm(3, user_id, 'Todo 3', new Date()),
  ];
};

const createMockTodoDto = (): TodoDto[] => {
  return [
    new TodoDto(1, 'Todo 1', user_id, 'ready', new Date()),
    new TodoDto(2, 'Todo 2', user_id, 'ready', new Date()),
    new TodoDto(3, 'Todo 3', user_id, 'ready', new Date()),
  ];
};
