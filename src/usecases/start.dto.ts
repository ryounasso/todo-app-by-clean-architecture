export class StartDto {
  private taskId: number;
  private status: string;

  constructor(taskId: number, status: string) {
    this.taskId = taskId;
    this.status = status;
  }

  getTaskId(): number {
    return this.taskId;
  }

  getStatus(): string {
    return this.status;
  }
}
