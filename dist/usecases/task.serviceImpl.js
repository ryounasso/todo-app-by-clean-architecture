"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoServiceImpl = void 0;
const task_repository_1 = require("./task.repository");
const common_1 = require("@nestjs/common");
let TodoServiceImpl = class TodoServiceImpl {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    getTodoList(userId) {
        return this.taskRepository.findTasks(userId);
    }
};
exports.TodoServiceImpl = TodoServiceImpl;
exports.TodoServiceImpl = TodoServiceImpl = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [task_repository_1.TaskRepository])
], TodoServiceImpl);
//# sourceMappingURL=task.serviceImpl.js.map