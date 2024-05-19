import { StatusType } from './status.type';

export class Todo {
  private id: number;
  private title: string;
  private status: StatusType;
  private userId: number;
  private createdAt: Date;
  private finishedAt: Date | null;

  constructor(
    id: number,
    title: string,
    status: StatusType,
    userId: number,
    createdAt: Date,
    finishedAt: Date | null,
  ) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.userId = userId;
    this.createdAt = createdAt;
    this.finishedAt = finishedAt;
  }

  getId(): number {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getStatus(): StatusType {
    return this.status;
  }

  getUserId(): number {
    return this.userId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getFinishedAt(): Date | null {
    return this.finishedAt;
  }
}
