export class UpdateTodoDto {
  id: number;
  title?: string;
  status?: string;
  finishedAt?: Date;

  constructor(id: number, title?: string, status?: string, finishedAt?: Date) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.finishedAt = finishedAt;
  }

  getId(): number {
    return this.id;
  }

  getTitle(): string | undefined {
    return this.title;
  }

  getStatus(): string | undefined {
    return this.status;
  }

  getFinishedAt(): Date | undefined {
    return this.finishedAt;
  }
}
