export class Todo {
  private id: number;
  private title: string;
  private status: string;
  private userId: number;
  private createdAt: Date;
  private finishedAt: Date | null;

  constructor(
    id: number,
    title: string,
    status: string,
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

  getStatus(): string {
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

  public updateTitle(newTitle: string): void {
    if (newTitle.length <= 0) {
      throw new Error('title should not empty');
    }
    this.title = newTitle;
  }

  public start(): void {
    this.status = 'doing';
  }

  public done(): void {
    this.status = 'done';
  }
}
