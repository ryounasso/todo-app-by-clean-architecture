export class UpdateOutputForm {
  private id: number;
  private user_id: number;
  private title: string;
  private created_at: Date;

  constructor(id: number, user_id: number, title: string, created_at: Date) {
    this.id = id;
    this.user_id = user_id;
    this.title = title;
    this.created_at = created_at;
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

  getCreatedAt(): Date {
    return this.created_at;
  }
}
