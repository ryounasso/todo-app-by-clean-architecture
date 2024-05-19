import { StatusType } from '../../entities/status.type';

export class InsertStatusDto {
  taskId: number;
  status: StatusType;

  constructor(taskId: number, status: StatusType) {
    this.taskId = taskId;
    this.status = status;
  }

  getTaskId(): number {
    return this.taskId;
  }

  getStatus(): StatusType {
    return this.status;
  }
}
