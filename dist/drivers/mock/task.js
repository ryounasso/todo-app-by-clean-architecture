"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockTaskList = void 0;
const task_1 = require("../../entities/task");
const mockTaskList = () => {
    return [
        new task_1.Task(1, 'Task 1', new Date()),
        new task_1.Task(2, 'Task 2', new Date()),
        new task_1.Task(3, 'Task 3', new Date()),
    ];
};
exports.mockTaskList = mockTaskList;
//# sourceMappingURL=task.js.map