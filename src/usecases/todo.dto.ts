export class TodoDto {
  id: number;
  title: string;
  user_id: number;
  createdAt: Date;

  constructor(id: number, title: string, user_id: number, createdAt: Date) {
    this.id = id;
    this.title = title;
    this.user_id = user_id;
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

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
