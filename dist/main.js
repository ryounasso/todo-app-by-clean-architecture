"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const todo_module_1 = require("./todo.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(todo_module_1.TodoModule);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map