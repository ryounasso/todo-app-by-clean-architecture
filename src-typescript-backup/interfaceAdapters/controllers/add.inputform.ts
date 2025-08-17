import { IsNotEmpty } from 'class-validator';

export class AddInputForm {
  @IsNotEmpty()
  private user_id: string;

  @IsNotEmpty()
  private title: string;

  constructor(user_id: string, title: string) {
    this.user_id = user_id;
    this.title = title;
  }

  getUserId(): string {
    return this.user_id;
  }

  getTitle(): string {
    return this.title;
  }
}
