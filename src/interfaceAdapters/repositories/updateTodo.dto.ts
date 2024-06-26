export class UpdateTodoDto {
  id: number;
  title: string;
  status: string;
  finishedAt: Date | null;

  constructor(
    id: number,
    title: string,
    status: string,
    finishedAt: Date | null,
  ) {
    this.id = id;
    this.title = title;
    this.status = status;
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

  getFinishedAt(): Date | null {
    return this.finishedAt;
  }
}
