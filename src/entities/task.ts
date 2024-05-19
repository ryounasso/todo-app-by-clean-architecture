export class Task {
  private id: number;
  private title: string;
  private userId: number;
  private status: string;
  private createdAt: Date;

  constructor(
    id: number,
    title: string,
    userId: number,
    status: string,
    createdAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.userId = userId;
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

  setTitle(title: string): void {
    this.title = title;
  }

  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }
}
