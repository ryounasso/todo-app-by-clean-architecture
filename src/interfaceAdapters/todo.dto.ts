export class TodoDto {
  id: number;
  title: string;
  user_id: number;
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
    this.user_id = user_id;
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
    return this.user_id;
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
