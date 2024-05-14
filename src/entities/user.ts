class User {
  id: number;
  name: string;
  password: string;
  createdAt: Date;

  constructor(id: number, name: string, password: string, createdAt: Date) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.createdAt = createdAt;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getPassword(): string {
    return this.password;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  setName(name: string): void {
    this.name = name;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }
}
