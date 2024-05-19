export class GetOutputForm {
  id: number;
  user_id: number;
  title: string;
  createdAt: Date;

  constructor(id: number, user_id: number, title: string, createdAt: Date) {
    this.id = id;
    this.title = title;
    this.user_id = user_id;
    this.createdAt = createdAt;
  }
}
