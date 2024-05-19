export class Task {
  private id: number;
  private title: string;

  private createdAt: Date;

  constructor(id: number, title: string, createdAt: Date) {
    this.id = id;
    this.title = title;

    this.createdAt = createdAt;
  }

  getId(): number {
    return this.id;
  }

  getTitle(): string {
    return this.title;
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
