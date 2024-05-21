import { IsNotEmpty } from 'class-validator';

export class UpdateInputForm {
  @IsNotEmpty()
  private id: string;

  @IsNotEmpty()
  private user_id: number;

  private title: string;

  constructor(id: string, user_id: number, title: string) {
    this.id = id;
    this.user_id = user_id;
    this.title = title;
  }

  getId(): string {
    return this.id;
  }

  getUserId(): number {
    return this.user_id;
  }

  getTitle(): string {
    return this.title;
  }
}
