import { StatusType } from './status.type';

export class Status {
  private id: number;
  private taskId: number;
  private status: StatusType;
  private createdAt: Date;
  private finishedAt: Date | null;

  constructor(
    id: number,
    taskId: number,
    status: StatusType,
    createdAt: Date,
    finishedAt: Date | null,
  ) {
    this.id = id;
    this.taskId = taskId;
    this.status = status;
    this.createdAt = createdAt;
    this.finishedAt = finishedAt;
  }

  getId(): number {
    return this.id;
  }

  getTaskId(): number {
    return this.taskId;
  }

  getStatus(): string {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getFinishedAt(): Date | null {
    return this.finishedAt;
  }

  static isValidStatus(statusType: string) {
    return ['untacched', 'doing', 'done'].includes(statusType);
  }
}
