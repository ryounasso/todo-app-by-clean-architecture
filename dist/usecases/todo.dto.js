"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoDto = void 0;
class TodoDto {
    constructor(id, title, user_id, createdAt) {
        this.id = id;
        this.title = title;
        this.user_id = user_id;
        this.createdAt = createdAt;
    }
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getUserId() {
        return this.user_id;
    }
    getCreatedAt() {
        return this.createdAt;
    }
}
exports.TodoDto = TodoDto;
//# sourceMappingURL=todo.dto.js.map