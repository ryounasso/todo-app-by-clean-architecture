export class UpdateTodoDto {
  id: number;
  title?: string;
  status?: string;
  finishiedAt?: Date;

  constructor(id: number, title?: string, status?: string, finishiedAt?: Date) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.finishiedAt = finishiedAt;
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

  getFinishiedAt(): Date | undefined {
    return this.finishiedAt;
  }
}
