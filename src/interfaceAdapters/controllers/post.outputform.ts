export class UpdateOutputForm {
  private id: number;
  private status: string;

  constructor(id: number, status: string) {
    this.id = id;
    this.status = status;
  }

  getId(): number {
    return this.id;
  }

  getStatus(): string {
    return this.status;
  }
}
