export class UpdateTodoDto {
  id: number;
  title?: string;
  status?: string;

  constructor(id: number, title?: string, status?: string) {
    this.id = id;
    this.title = title;
    this.status = status;
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
}
