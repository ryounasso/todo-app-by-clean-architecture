export class UpdateTodoDto {
  id: number;
  title?: string;
  status?: string;
  finished?: Date;

  constructor(id: number, title?: string, status?: string, finished?: Date) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.finished = finished;
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
    return this.finished;
  }
}
