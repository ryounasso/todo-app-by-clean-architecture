export class UpdateTodoDto {
  id: number;
  user_id: number;
  title: string;

  constructor(id: number, title: string, user_id: number) {
    this.id = id;
    this.title = title;
    this.user_id = user_id;
  }

  getId(): number {
    return this.id;
  }

  getUserId(): number {
    return this.user_id;
  }

  getTitle(): string {
    return this.title;
  }
}
