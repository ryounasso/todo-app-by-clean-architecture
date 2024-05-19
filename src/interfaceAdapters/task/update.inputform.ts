import { IsNotEmpty } from 'class-validator';

export class UpdateInputForm {
  @IsNotEmpty()
  private id: number;

  @IsNotEmpty()
  private user_id: number;

  private title: string;

  constructor(id: number, user_id: number, title: string) {
    this.id = id;
    this.user_id = user_id;
    this.title = title;
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
