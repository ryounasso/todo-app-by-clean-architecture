export class TodoDto {
  id: number;
  title: string;
  userId: number;
  status: string;
  createdAt: Date;

  constructor(
    id: number,
    title: string,
    user_id: number,
    status: string,
    createdAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.userId = user_id;
    this.status = status;
    this.createdAt = createdAt;
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
}
