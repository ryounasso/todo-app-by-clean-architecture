export declare class TodoDto {
    id: number;
    title: string;
    user_id: number;
    createdAt: Date;
    constructor(id: number, title: string, user_id: number, createdAt: Date);
    getId(): number;
    getTitle(): string;
    getUserId(): number;
    getCreatedAt(): Date;
}
