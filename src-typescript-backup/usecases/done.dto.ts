export class DoneDto {
  private todoId: number;
  private status: string;

  constructor(todoId: number, status: string) {
    this.todoId = todoId;
    this.status = status;
  }

  getTodoId(): number {
    return this.todoId;
  }

  getStatus(): string {
    return this.status;
  }
}
