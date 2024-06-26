// Item クラスが TodoListDto クラスの静的メンバとして定義されると、TypeScript が正しくプロパティのアクセス修飾子を認識できない。
// Item クラスを外部に定義し、それを TodoListDto クラスの静的メンバとして再定義する。

export class Item {
  private id?: number;
  private title?: string;
  private userId?: number;
  private status?: string;
  private createdAt?: Date;
  private finishedAt?: Date | null;

  constructor(
    id?: number,
    title?: string,
    status?: string,
    userId?: number,
    createdAt?: Date,
    finishedAt?: Date | null,
  ) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.userId = userId;
    this.createdAt = createdAt;
    this.finishedAt = finishedAt;
  }

  getId(): number | undefined {
    return this.id;
  }

  getStatus(): string | undefined {
    return this.status;
  }

  getTitle(): string | undefined {
    return this.title;
  }

  getUserId(): number | undefined {
    return this.userId;
  }

  getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  getFinishedAt(): Date | null | undefined {
    return this.finishedAt;
  }
}

export class TodoListDto {
  private todoList: Item[];

  constructor(todoList: Item[]) {
    this.todoList = todoList;
  }

  getTodoList(): Item[] {
    return this.todoList;
  }

  public static Item = Item;
}
