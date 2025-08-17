export class TodoTitleDto {
  private todoId: number;
  private title: string;

  constructor(todoId: number, title: string) {
    this.todoId = todoId;
    this.title = title;
  }

  getTodoId(): number {
    return this.todoId;
  }

  getTitle(): string {
    return this.title;
  }
}
