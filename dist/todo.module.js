"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoModule = void 0;
const common_1 = require("@nestjs/common");
const get_controller_1 = require("./interfaceAdapters/get.controller");
const task_serviceImpl_1 = require("./usecases/task.serviceImpl");
const task_repository_1 = require("./usecases/task.repository");
let TodoModule = class TodoModule {
};
exports.TodoModule = TodoModule;
exports.TodoModule = TodoModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [get_controller_1.GetController],
        providers: [
            {
                provide: 'TodoService',
                useClass: task_serviceImpl_1.TodoServiceImpl,
            },
            task_repository_1.TaskRepository,
        ],
    })
], TodoModule);
//# sourceMappingURL=todo.module.js.map