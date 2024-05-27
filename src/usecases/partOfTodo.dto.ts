export class PartOfTodoDto {
  private id: number;
  private title?: string;
  private userId?: number;
  private status?: string;
  private createdAt?: Date;
  private finishedAt?: Date | null;

  constructor(
    id: number,
    title?: string,
    status?: string,
    userId?: number,
    createdAt?: Date,
    finishedAt?: Date | null,
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

  getStatus(): string | undefined {
    return this.status;
  }

  getTitle(): string | undefined {
    return this.title;
  }

  getUserId(): number | undefined {
    return this.userId;
  }

  getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  getFinishedAt(): Date | null | undefined {
    return this.finishedAt;
  }
}
