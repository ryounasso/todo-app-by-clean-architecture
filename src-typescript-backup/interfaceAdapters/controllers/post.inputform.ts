import { IsNotEmpty } from 'class-validator';

export class UpdateInputForm {
  @IsNotEmpty()
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  getId(): string {
    return this.id;
  }
}
