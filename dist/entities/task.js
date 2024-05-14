"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    constructor(id, title, createdAt) {
        this.id = id;
        this.title = title;
        this.createdAt = createdAt;
    }
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setTitle(title) {
        this.title = title;
    }
    setCreatedAt(createdAt) {
        this.createdAt = createdAt;
    }
}
exports.Task = Task;
//# sourceMappingURL=task.js.map