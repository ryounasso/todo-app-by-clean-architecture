export class TodoDto {
  id: number;
  title: string;
  user_id: number;
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
    this.user_id = user_id;
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
    return this.user_id;
  }

  getStatus(): string {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
