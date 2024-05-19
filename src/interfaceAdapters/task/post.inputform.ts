import { IsNotEmpty } from 'class-validator';

export class UpdateInputForm {
  @IsNotEmpty()
  private id: number;

  constructor(id: number) {
    this.id = id;
  }

  getId(): number {
    return this.id;
  }
}
