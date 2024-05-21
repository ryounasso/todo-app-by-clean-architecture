export class GetOutputForm {
  id: number;
  user_id: number;
  title: string;
  status: string;
  createdAt: Date;
  finishedAt: Date | null;

  constructor(
    id: number,
    user_id: number,
    title: string,
    status: string,
    createdAt: Date,
    finishedAt: Date | null,
  ) {
    this.id = id;
    this.user_id = user_id;
    this.title = title;
    this.status = status;
    this.createdAt = createdAt;
    this.finishedAt = finishedAt;
  }
}
