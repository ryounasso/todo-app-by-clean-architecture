export class AddTodoDto {
  private user_id: number;
  private title: string;

  constructor(user_id: number, title: string) {
    this.user_id = user_id;
    this.title = title;
  }

  getUserId(): number {
    return this.user_id;
  }

  getTitle(): string {
    return this.title;
  }
}
