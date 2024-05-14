export declare class Task {
    private id;
    private title;
    private createdAt;
    constructor(id: number, title: string, createdAt: Date);
    getId(): number;
    getTitle(): string;
    getCreatedAt(): Date;
    setTitle(title: string): void;
    setCreatedAt(createdAt: Date): void;
}
