declare class User {
    id: number;
    name: string;
    password: string;
    createdAt: Date;
    constructor(id: number, name: string, password: string, createdAt: Date);
    getId(): number;
    getName(): string;
    getPassword(): string;
    getCreatedAt(): Date;
    setName(name: string): void;
    setPassword(password: string): void;
    setCreatedAt(createdAt: Date): void;
}
