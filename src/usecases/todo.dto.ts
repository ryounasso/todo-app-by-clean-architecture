export class TodoDto {
  id: number;
  title: string;
  userId: number;
  status: string;
  createdAt: Date;
  finishedAt: Date | null;

  constructor(
    id: number,
    title: string,
    user_id: number,
    status: string,
    createdAt: Date,
    finishedAt: Date | null,
  ) {
    this.id = id;
    this.title = title;
    this.userId = user_id;
    this.status = status;
    this.createdAt = createdAt;
    this.finishedAt = finishedAt;
  }

  getId(): number {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getUserId(): number {
    return this.userId;
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
}
